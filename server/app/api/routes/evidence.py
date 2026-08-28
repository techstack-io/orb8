from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.repositories.evidence_repository import EvidenceRepository
from app.schemas.evidence import EvidenceOut

router = APIRouter(prefix="/ventures/{venture_id}/evidence", tags=["evidence"])
repo = EvidenceRepository()


@router.get("", response_model=list[EvidenceOut])
async def list_evidence(
    venture_id: str,
    source: str | None = None,
    signal_type: str | None = None,
    concept: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    rows = await repo.list_for_venture(db, venture_id, source, signal_type, concept)
    return [EvidenceOut(
        id=r.id, venture_id=r.venture_id, source=r.source,
        signal_type=r.signal_type, concept=r.concept, value=r.value,
        normalized_score=r.normalized_score, direction=r.direction,
        geography=r.geography, confidence=r.confidence,
        observed_at=r.observed_at, source_url=r.source_url,
        metadata=r.meta or {},
    ) for r in rows]
