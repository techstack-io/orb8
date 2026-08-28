from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.market_evidence import MarketEvidence


class EvidenceRepository:
    async def add_many(self, db: AsyncSession, rows: list[MarketEvidence]) -> list[MarketEvidence]:
        db.add_all(rows)
        await db.commit()
        return rows

    async def list_for_venture(
        self,
        db: AsyncSession,
        venture_id: str,
        source: str | None = None,
        signal_type: str | None = None,
        concept: str | None = None,
    ) -> list[MarketEvidence]:
        stmt = select(MarketEvidence).where(MarketEvidence.venture_id == venture_id)
        if source:
            stmt = stmt.where(MarketEvidence.source == source)
        if signal_type:
            stmt = stmt.where(MarketEvidence.signal_type == signal_type)
        if concept:
            stmt = stmt.where(MarketEvidence.concept == concept)
        stmt = stmt.order_by(MarketEvidence.observed_at.desc())
        return list((await db.scalars(stmt)).all())
