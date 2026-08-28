from datetime import datetime
from pydantic import BaseModel, Field


class EvidenceSignal(BaseModel):
    source: str
    signal_type: str
    concept: str
    value: float | None = None
    normalized_score: float | None = Field(default=None, ge=0, le=1)
    direction: str | None = None
    geography: str | None = None
    confidence: float = Field(ge=0, le=1)
    observed_at: datetime
    source_url: str | None = None
    metadata: dict = Field(default_factory=dict)


class EvidenceOut(EvidenceSignal):
    id: str
    venture_id: str
