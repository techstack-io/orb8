from datetime import datetime, timezone
from app.schemas.evidence import EvidenceSignal


class GoogleTrendsClient:
    """Bootstrap adapter. Replace with official Google Trends API calls when enabled."""

    async def fetch(self, concepts: list[str], geo: str = "US") -> list[EvidenceSignal]:
        seed_scores = [0.88, 0.79, 0.72, 0.66, 0.61, 0.48]
        out: list[EvidenceSignal] = []
        for i, concept in enumerate(concepts):
            score = seed_scores[i % len(seed_scores)]
            out.append(EvidenceSignal(
                source="google_trends",
                signal_type="search_interest",
                concept=concept,
                value=round(score * 100, 1),
                normalized_score=score,
                direction="growing" if i % 3 else "stable",
                geography=geo,
                confidence=0.90,
                observed_at=datetime.now(timezone.utc),
                source_url="https://trends.google.com/",
                metadata={"bootstrap": True},
            ))
        return out
