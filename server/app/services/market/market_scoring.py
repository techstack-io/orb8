from statistics import mean
from app.schemas.evidence import EvidenceSignal

WEIGHTS = {
    "search_demand": 0.30,
    "trend_direction": 0.20,
    "geographic_breadth": 0.15,
    "category_activity": 0.15,
    "competitive_evidence": 0.10,
    "community_evidence": 0.10,
}


def _avg(values: list[float], default: float = 0.5) -> float:
    return mean(values) if values else default


def score_market(signals: list[EvidenceSignal]) -> tuple[float, dict[str, float]]:
    search = [s.normalized_score or 0 for s in signals if s.signal_type == "search_interest"]
    geography = [s.normalized_score or 0 for s in signals if s.signal_type == "geographic_breadth"]
    access = [s.normalized_score or 0 for s in signals if s.signal_type == "market_access"]

    dimensions = {
        "search_demand": _avg(search),
        "trend_direction": min(1.0, _avg(search) + 0.05),
        "geographic_breadth": _avg(geography),
        "category_activity": _avg(access, 0.72),
        "competitive_evidence": 0.70,
        "community_evidence": 0.62,
    }
    score = sum(dimensions[k] * WEIGHTS[k] for k in WEIGHTS) * 100
    return round(score, 1), dimensions


def verdict_for(score: float) -> str:
    if score >= 75:
        return "strong"
    if score >= 55:
        return "moderate"
    return "weak"
