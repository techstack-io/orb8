from datetime import date, timedelta
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.integrations.dataforseo_trends import get_google_trends_interest

router = APIRouter()


class TrendsRequest(BaseModel):
    product: str = Field(..., min_length=1)
    audience: str | None = None
    industry: str | None = None
    geography: str | None = "US"
    traction_problem: str | None = None


class TrendQuery(BaseModel):
    term: str
    query_type: str
    reason: str


def build_trends_plan(payload: TrendsRequest) -> list[TrendQuery]:
    context = " ".join(
        value
        for value in [
            payload.product,
            payload.audience,
            payload.industry,
            payload.traction_problem,
        ]
        if value
    ).lower()

    if any(
        term in context
        for term in [
            "meditation",
            "mindfulness",
            "mental health",
            "wellness",
            "stress",
            "anxiety",
        ]
    ):
        return [
            TrendQuery(
                term="meditation",
                query_type="category",
                reason="Measures broad interest in meditation.",
            ),
            TrendQuery(
                term="mindfulness",
                query_type="category",
                reason="Measures interest in an adjacent mindfulness category.",
            ),
            TrendQuery(
                term="meditation app",
                query_type="solution",
                reason="Measures explicit demand for meditation apps.",
            ),
            TrendQuery(
                term="guided meditation",
                query_type="solution",
                reason="Measures demand for guided meditation as a solution.",
            ),
            TrendQuery(
                term="learn meditation",
                query_type="solution",
                reason="Measures intent to learn meditation as a skill.",
            ),
            TrendQuery(
                term="how to stop overthinking",
                query_type="problem",
                reason="Measures demand around overthinking as a user problem.",
            ),
            TrendQuery(
                term="racing thoughts",
                query_type="problem",
                reason="Measures demand around persistent or intrusive thoughts.",
            ),
            TrendQuery(
                term="work stress",
                query_type="problem",
                reason="Measures demand around work-related stress.",
            ),
            TrendQuery(
                term="how to focus better",
                query_type="problem",
                reason="Measures demand around attention and concentration.",
            ),
        ]

    queries: list[TrendQuery] = [
        TrendQuery(
            term=payload.product.strip(),
            query_type="brand",
            reason="Measures search demand for the product or venture.",
        )
    ]

    if payload.industry:
        queries.append(
            TrendQuery(
                term=payload.industry.strip(),
                query_type="category",
                reason="Measures broad interest in the venture's industry.",
            )
        )

    return queries


def calculate_series_metrics(
    keyword: str,
    items: list[dict[str, Any]],
) -> dict[str, Any]:
    points: list[dict[str, Any]] = []

    for item in items:
        values = item.get("values", {})

        value = values.get(keyword)

        if value is None:
            continue

        points.append(
            {
                "date_from": item.get("date_from"),
                "date_to": item.get("date_to"),
                "value": value,
            }
        )

    if not points:
        return {
            "keyword": keyword,
            "current_interest": None,
            "average_interest": None,
            "peak_interest": None,
            "change_percent": None,
            "points": [],
        }

    numeric_values = [point["value"] for point in points]

    current = numeric_values[-1]
    first = numeric_values[0]

    change_percent = None

    if first != 0:
        change_percent = round(
            ((current - first) / abs(first)) * 100,
            2,
        )

    return {
        "keyword": keyword,
        "current_interest": current,
        "average_interest": round(
            sum(numeric_values) / len(numeric_values),
            2,
        ),
        "peak_interest": max(numeric_values),
        "change_percent": change_percent,
        "points": points,
    }


@router.get("")
async def trends_health():
    return {
        "success": True,
        "provider": "DataForSEO / Google Trends",
        "message": "ORB8 Trends research provider is available.",
    }


@router.post("")
async def research_trends(payload: TrendsRequest):
    try:
        research_plan = build_trends_plan(payload)

        if not research_plan:
            raise HTTPException(
                status_code=400,
                detail="No Trends research queries were generated.",
            )

        date_to = date.today()
        date_from = date_to - timedelta(days=365)

        # Keep each comparison group small because Google Trends values
        # are normalized relative to the terms in the same request.
        batches = [
            research_plan[index : index + 5]
            for index in range(0, len(research_plan), 5)
        ]

        results: list[dict[str, Any]] = []

        for batch in batches:
            keywords = [query.term for query in batch]

            trends_data = await get_google_trends_interest(
                keywords=keywords,
                geography=payload.geography or "US",
                date_from=date_from.isoformat(),
                date_to=date_to.isoformat(),
            )

            items = trends_data.get("items", [])

            for query in batch:
                metrics = calculate_series_metrics(
                    query.term,
                    items,
                )

                results.append(
                    {
                        "term": query.term,
                        "type": query.query_type,
                        "reason": query.reason,
                        "metrics": metrics,
                    }
                )

        grouped = {
            "problem": [
                result
                for result in results
                if result["type"] == "problem"
            ],
            "category": [
                result
                for result in results
                if result["type"] == "category"
            ],
            "solution": [
                result
                for result in results
                if result["type"] == "solution"
            ],
            "brand": [
                result
                for result in results
                if result["type"] == "brand"
            ],
        }

        return {
            "success": True,
            "venture": {
                "product": payload.product,
                "audience": payload.audience,
                "industry": payload.industry,
                "geography": payload.geography or "US",
                "traction_problem": payload.traction_problem,
            },
            "provider": "DataForSEO / Google Trends",
            "period": {
                "date_from": date_from.isoformat(),
                "date_to": date_to.isoformat(),
            },
            "research_plan": [
                query.model_dump()
                for query in research_plan
            ],
            "results": results,
            "grouped": grouped,
        }

    except HTTPException:
        raise

    except Exception as exc:
        print(f"ORB8 Trends research failed: {exc}")

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        ) from exc