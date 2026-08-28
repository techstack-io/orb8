from datetime import datetime, timezone
from app.schemas.evidence import EvidenceSignal


class WorldBankClient:
    async def fetch(self, concepts: list[str], geo: str = "US") -> list[EvidenceSignal]:
        return [EvidenceSignal(
            source="world_bank",
            signal_type="market_access",
            concept="internet_penetration",
            value=97.0,
            normalized_score=0.97,
            direction="high",
            geography=geo,
            confidence=0.95,
            observed_at=datetime.now(timezone.utc),
            source_url="https://data.worldbank.org/",
            metadata={"bootstrap": True},
        )]
