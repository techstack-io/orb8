from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.api.router import api_router
from app.db.base import Base
from app.db.session import engine
from app.models import venture, market_evidence  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="ORB8 API",
    version="0.1.0",
    description="Market Evidence bootstrap backend for ORB8",
    lifespan=lifespan,
)
app.include_router(api_router)
