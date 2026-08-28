from datetime import datetime
from sqlalchemy import DateTime, Float, JSON, String
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base


class MarketEvidence(Base):
    __tablename__ = "market_evidence"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    venture_id: Mapped[str] = mapped_column(String(64), index=True)
    source: Mapped[str] = mapped_column(String(100), index=True)
    signal_type: Mapped[str] = mapped_column(String(100), index=True)
    concept: Mapped[str] = mapped_column(String(255), index=True)
    value: Mapped[float | None] = mapped_column(Float, nullable=True)
    normalized_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    direction: Mapped[str | None] = mapped_column(String(50), nullable=True)
    geography: Mapped[str | None] = mapped_column(String(100), nullable=True)
    confidence: Mapped[float] = mapped_column(Float, default=0.5)
    source_url: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    meta: Mapped[dict] = mapped_column(JSON, default=dict)
    observed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
