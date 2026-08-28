from sqlalchemy.ext.asyncio import AsyncSession
from app.models.venture import Venture


class VentureRepository:
    async def add(self, db: AsyncSession, venture: Venture) -> Venture:
        db.add(venture)
        await db.commit()
        await db.refresh(venture)
        return venture

    async def get(self, db: AsyncSession, venture_id: str) -> Venture | None:
        return await db.get(Venture, venture_id)
