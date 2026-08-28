from app.services.market.market_scoring import score_market, verdict_for
from app.schemas.evidence import EvidenceSignal


def diagnose(signals: list[EvidenceSignal]) -> dict:
    score, dimensions = score_market(signals)
    verdict = verdict_for(score)
    confidence = min(0.95, 0.55 + len(signals) * 0.03)
    return {
        "verdict": verdict,
        "confidence": round(confidence, 2),
        "score": score,
        "dimensions": dimensions,
        "primary_finding": "Observable market demand exists." if verdict != "weak" else "Market demand is not yet sufficiently evidenced.",
        "interpretation": "The broad category shows sustained demand. The next useful question is which audience and job-to-be-done are underserved.",
        "primary_uncertainty": "Which audience has the strongest unmet need?",
        "recommended_next_stage": "audience",
    }
