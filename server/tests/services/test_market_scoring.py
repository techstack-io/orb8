from datetime import datetime, timezone
from app.schemas.evidence import EvidenceSignal
from app.services.market.market_scoring import score_market, verdict_for


def test_market_score_is_deterministic():
    signals = [
        EvidenceSignal(source="x", signal_type="search_interest", concept="a", normalized_score=.9, confidence=.9, observed_at=datetime.now(timezone.utc)),
        EvidenceSignal(source="x", signal_type="geographic_breadth", concept="b", normalized_score=.8, confidence=.9, observed_at=datetime.now(timezone.utc)),
        EvidenceSignal(source="x", signal_type="market_access", concept="c", normalized_score=.95, confidence=.9, observed_at=datetime.now(timezone.utc)),
    ]
    score, dimensions = score_market(signals)
    assert 0 <= score <= 100
    assert dimensions["search_demand"] == .9
    assert verdict_for(score) in {"weak", "moderate", "strong"}
