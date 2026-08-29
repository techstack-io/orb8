import base64
from datetime import datetime, timedelta, timezone

import httpx

from app.core.config import get_settings
from app.schemas.evidence import EvidenceSignal


DATAFORSEO_TRENDS_URL = (
    "https://api.dataforseo.com/v3/keywords_data/"
    "google_trends/explore/live"
)


class GoogleTrendsClient:
    async def fetch(
        self,
        concepts: list[str],
        geo: str = "US",
    ) -> list[EvidenceSignal]:
        concepts = [
            concept.strip()
            for concept in concepts
            if concept and concept.strip()
        ]

        if not concepts:
            return []

        if len(concepts) > 5:
            raise ValueError(
                "Google Trends supports a maximum of 5 comparable concepts per request"
            )

        settings = get_settings()

        credentials = (
            f"{settings.dataforseo_login}:"
            f"{settings.dataforseo_password}"
        ).encode("utf-8")

        encoded_credentials = base64.b64encode(
            credentials
        ).decode("utf-8")

        date_to = datetime.now(timezone.utc).date()
        date_from = date_to - timedelta(days=365)

        payload = [
            {
                "keywords": concepts,
                "location_code": self._location_code(geo),
                "language_code": "en",
                "date_from": date_from.isoformat(),
                "date_to": date_to.isoformat(),
                "type": "web",
                "item_types": ["google_trends_graph"],
            }
        ]

        headers = {
            "Authorization": f"Basic {encoded_credentials}",
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                DATAFORSEO_TRENDS_URL,
                headers=headers,
                json=payload,
            )

        response.raise_for_status()

        body = response.json()

        if body.get("status_code") != 20000:
            raise RuntimeError(
                f"DataForSEO error: "
                f"{body.get('status_message')}"
            )

        tasks = body.get("tasks") or []

        if not tasks:
            raise RuntimeError(
                "DataForSEO returned no tasks"
            )

        task = tasks[0]

        if task.get("status_code") != 20000:
            raise RuntimeError(
                f"DataForSEO task error: "
                f"{task.get('status_message')}"
            )

        results = task.get("result") or []

        if not results:
            return []

        result = results[0]

        graph = next(
            (
                item
                for item in result.get("items", [])
                if item.get("type")
                == "google_trends_graph"
            ),
            None,
        )

        if not graph:
            return []

        points = graph.get("data") or []

        signals: list[EvidenceSignal] = []

        for index, concept in enumerate(concepts):
            values: list[float] = []

            for point in points:
                point_values = point.get("values") or []

                if index >= len(point_values):
                    continue

                value = point_values[index]

                if isinstance(value, (int, float)):
                    values.append(float(value))

            if not values:
                continue

            current = values[-1]
            average = sum(values) / len(values)

            recent = values[-12:]
            previous = values[-24:-12]

            recent_average = (
                sum(recent) / len(recent)
                if recent
                else average
            )

            previous_average = (
                sum(previous) / len(previous)
                if previous
                else average
            )

            if recent_average > previous_average * 1.10:
                direction = "growing"
            elif recent_average < previous_average * 0.90:
                direction = "declining"
            else:
                direction = "stable"

            signals.append(
                EvidenceSignal(
                    source="google_trends",
                    signal_type="search_interest",
                    concept=concept,
                    value=round(current, 1),
                    normalized_score=round(
                        current / 100,
                        3,
                    ),
                    direction=direction,
                    geography=geo,
                    confidence=0.90,
                    observed_at=datetime.now(
                        timezone.utc
                    ),
                    source_url=result.get(
                        "check_url",
                        "https://trends.google.com/",
                    ),
                    metadata={
                        "provider": "dataforseo",
                        "average_interest": round(
                            average,
                            1,
                        ),
                        "peak_interest": round(
                            max(values),
                            1,
                        ),
                        "sample_count": len(values),
                        "date_from": (
                            date_from.isoformat()
                        ),
                        "date_to": (
                            date_to.isoformat()
                        ),
                        "bootstrap": False,
                    },
                )
            )

        return signals

    @staticmethod
    def _location_code(geo: str) -> int:
        locations = {
            "US": 2840,
            "USA": 2840,
            "UNITED STATES": 2840,
            "GB": 2826,
            "UK": 2826,
            "UNITED KINGDOM": 2826,
            "CA": 2124,
            "CANADA": 2124,
            "AU": 2036,
            "AUSTRALIA": 2036,
        }

        return locations.get(
            geo.strip().upper(),
            2840,
        )