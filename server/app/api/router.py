from fastapi import APIRouter
from app.api.routes import evidence, health, market, ventures

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(health.router)
api_router.include_router(ventures.router)
api_router.include_router(market.router)
api_router.include_router(evidence.router)
