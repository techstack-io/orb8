from datetime import datetime, timezone
from app.schemas.evidence import EvidenceSignal


class DataCommonsClient:
    async def fetch(self, concepts: list[str], geo: str = "US") -> list[EvidenceSignal]:
        return [EvidenceSignal(
            source="datacommons",
            signal_type="geographic_breadth",
            concept="addressable_population",
            value=258_000_000,
            normalized_score=0.84,
            direction="broad",
            geography=geo,
            confidence=0.80,
            observed_at=datetime.now(timezone.utc),
            source_url="https://datacommons.org/",
            metadata={"bootstrap": True, "note": "Sample adult population proxy"},
        )]
