from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models.venture import Venture
from app.repositories.venture_repository import VentureRepository
from app.schemas.venture import VentureCreate, VentureOut

router = APIRouter(prefix="/ventures", tags=["ventures"])
repo = VentureRepository()


@router.post("", response_model=VentureOut, status_code=201)
async def create_venture(payload: VentureCreate, db: AsyncSession = Depends(get_db)) -> VentureOut:
    venture = Venture(
        id=f"ven_{uuid4().hex[:16]}",
        name=payload.name,
        description=payload.description,
        website=str(payload.website) if payload.website else None,
    )
    return await repo.add(db, venture)


@router.get("/{venture_id}", response_model=VentureOut)
async def get_venture(venture_id: str, db: AsyncSession = Depends(get_db)) -> VentureOut:
    venture = await repo.get(db, venture_id)
    if not venture:
        raise HTTPException(404, "Venture not found")
    return venture
