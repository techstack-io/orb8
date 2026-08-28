from pydantic import BaseModel, Field
from app.schemas.evidence import EvidenceOut


class MarketHypothesisRequest(BaseModel):
    market_description: str


class MarketHypothesisResponse(BaseModel):
    hypothesis: str
    concepts: list[str]


class MarketCollectRequest(BaseModel):
    sources: list[str] = ["google_trends", "datacommons", "world_bank"]
    concepts: list[str] | None = None


class MarketCollectResponse(BaseModel):
    run_id: str
    status: str
    signals_collected: int


class DiagnosisResponse(BaseModel):
    verdict: str
    confidence: float = Field(ge=0, le=1)
    score: float = Field(ge=0, le=100)
    primary_finding: str
    interpretation: str
    primary_uncertainty: str
    recommended_next_stage: str


class DashboardMetric(BaseModel):
    label: str
    value: str
    score: float


class DashboardResponse(BaseModel):
    status: str
    confidence: float
    score: float
    summary: str
    metrics: dict[str, DashboardMetric]
    demand_signals: list[EvidenceOut]
    evidence_for: list[str]
    unknowns: list[str]
    next_step: dict[str, str]
