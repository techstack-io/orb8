from app.schemas.evidence import EvidenceSignal


def normalize(signal: EvidenceSignal) -> EvidenceSignal:
    if signal.normalized_score is None and signal.value is not None:
        signal.normalized_score = max(0.0, min(1.0, signal.value / 100.0))
    return signal
