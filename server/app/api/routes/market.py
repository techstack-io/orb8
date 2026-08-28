from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.repositories.evidence_repository import EvidenceRepository
from app.repositories.venture_repository import VentureRepository
from app.schemas.market import (
    MarketHypothesisRequest, MarketHypothesisResponse,
    MarketCollectRequest, MarketCollectResponse,
    DiagnosisResponse, DashboardResponse, DashboardMetric,
)
from app.schemas.evidence import EvidenceOut
from app.services.market.query_generator import generate_market_hypothesis
from app.services.market.market_service import MarketService
from app.services.market.market_diagnosis import diagnose

router = APIRouter(prefix="/ventures/{venture_id}/market", tags=["market"])
ventures = VentureRepository()
evidence = EvidenceRepository()
service = MarketService()


def _to_out(row) -> EvidenceOut:
    return EvidenceOut(
        id=row.id,
        venture_id=row.venture_id,
        source=row.source,
        signal_type=row.signal_type,
        concept=row.concept,
        value=row.value,
        normalized_score=row.normalized_score,
        direction=row.direction,
        geography=row.geography,
        confidence=row.confidence,
        observed_at=row.observed_at,
        source_url=row.source_url,
        metadata=row.meta or {},
    )


@router.post("/hypothesis", response_model=MarketHypothesisResponse)
async def hypothesis(venture_id: str, payload: MarketHypothesisRequest, db: AsyncSession = Depends(get_db)):
    if not await ventures.get(db, venture_id):
        raise HTTPException(404, "Venture not found")
    h, concepts = generate_market_hypothesis(payload.market_description)
    return {"hypothesis": h, "concepts": concepts}


@router.post("/collect", response_model=MarketCollectResponse)
async def collect(venture_id: str, payload: MarketCollectRequest, db: AsyncSession = Depends(get_db)):
    if not await ventures.get(db, venture_id):
        raise HTTPException(404, "Venture not found")
    run_id, count = await service.collect(db, venture_id, payload.sources, payload.concepts)
    return {"run_id": run_id, "status": "completed", "signals_collected": count}


@router.post("/diagnose", response_model=DiagnosisResponse)
async def diagnose_market(venture_id: str, db: AsyncSession = Depends(get_db)):
    rows = await evidence.list_for_venture(db, venture_id)
    if not rows:
        raise HTTPException(409, "No market evidence collected")
    result = diagnose([_to_out(r) for r in rows])
    return result


@router.get("/dashboard", response_model=DashboardResponse)
async def dashboard(venture_id: str, db: AsyncSession = Depends(get_db)):
    rows = await evidence.list_for_venture(db, venture_id)
    if not rows:
        raise HTTPException(409, "No market evidence collected")
    outs = [_to_out(r) for r in rows]
    result = diagnose(outs)
    d = result["dimensions"]
    metrics = {
        "search_demand": DashboardMetric(label="Search demand", value="Strong" if d["search_demand"] >= .7 else "Moderate", score=d["search_demand"]),
        "market_direction": DashboardMetric(label="Market direction", value="Growing", score=d["trend_direction"]),
        "geographic_breadth": DashboardMetric(label="Geographic breadth", value="Broad", score=d["geographic_breadth"]),
        "category_activity": DashboardMetric(label="Category activity", value="High", score=d["category_activity"]),
    }
    demand = [x for x in outs if x.signal_type == "search_interest"][:10]
    return DashboardResponse(
        status=result["verdict"],
        confidence=result["confidence"],
        score=result["score"],
        summary="The market shows observable, sustained demand with enough evidence to continue investigation.",
        metrics=metrics,
        demand_signals=demand,
        evidence_for=[
            "Category demand exists",
            "Search behavior is sustained",
            "The market is geographically broad",
            "Digital access is high",
        ],
        unknowns=[
            "Who the venture should target first",
            "Which unmet problem matters most",
            "Why current solutions fail",
            "Whether users will choose this solution",
            "Whether users will pay",
        ],
        next_step={"stage": "audience", "title": "Define the audience"},
    )
