from app.schemas.evidence import EvidenceSignal


def by_type(signals: list[EvidenceSignal]) -> dict[str, list[EvidenceSignal]]:
    grouped: dict[str, list[EvidenceSignal]] = {}
    for signal in signals:
        grouped.setdefault(signal.signal_type, []).append(signal)
    return grouped
