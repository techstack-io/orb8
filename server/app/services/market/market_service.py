from uuid import uuid4
from sqlalchemy.ext.asyncio import AsyncSession
from app.integrations.google_trends.client import GoogleTrendsClient
from app.integrations.datacommons.client import DataCommonsClient
from app.integrations.world_bank.client import WorldBankClient
from app.models.market_evidence import MarketEvidence
from app.repositories.evidence_repository import EvidenceRepository
from app.schemas.evidence import EvidenceSignal
from app.services.market.evidence_normalizer import normalize
from app.services.market.query_generator import DEFAULT_CONCEPTS


class MarketService:
    def __init__(self) -> None:
        self.clients = {
            "google_trends": GoogleTrendsClient(),
            "datacommons": DataCommonsClient(),
            "world_bank": WorldBankClient(),
        }
        self.repo = EvidenceRepository()

    async def collect(
        self,
        db: AsyncSession,
        venture_id: str,
        sources: list[str],
        concepts: list[str] | None = None,
    ) -> tuple[str, int]:
        concepts = concepts or DEFAULT_CONCEPTS
        signals: list[EvidenceSignal] = []
        for source in sources:
            client = self.clients.get(source)
            if client:
                signals.extend(await client.fetch(concepts))

        rows = []
        for raw in signals:
            s = normalize(raw)
            rows.append(MarketEvidence(
                id=f"ev_{uuid4().hex[:16]}",
                venture_id=venture_id,
                source=s.source,
                signal_type=s.signal_type,
                concept=s.concept,
                value=s.value,
                normalized_score=s.normalized_score,
                direction=s.direction,
                geography=s.geography,
                confidence=s.confidence,
                source_url=s.source_url,
                meta=s.metadata,
                observed_at=s.observed_at.replace(tzinfo=None),
            ))
        await self.repo.add_many(db, rows)
        return f"run_{uuid4().hex[:16]}", len(rows)
