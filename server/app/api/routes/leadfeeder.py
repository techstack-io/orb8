
import httpx
from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.security import APIKeyHeader

router = APIRouter(prefix="/leadfeeder", tags=["leadfeeder"])

api_key_header = APIKeyHeader(
    name="X-Api-Key",
    description="Your existing Leadfeeder API key",
)

LEADFEEDER_BASE_URL = "https://api.leadfeeder.com/v1"


@router.get("/accounts")
async def get_leadfeeder_accounts(
    api_key: str = Security(api_key_header),
):
    """Read the Leadfeeder accounts accessible to this API key."""

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                f"{LEADFEEDER_BASE_URL}/accounts",
                headers={"X-Api-Key": api_key},
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail="Leadfeeder rejected the request. Check the API key and permissions.",
            )

        return response.json()

    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Could not connect to Leadfeeder.",
        )
