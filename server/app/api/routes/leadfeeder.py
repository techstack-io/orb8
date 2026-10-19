
import httpx
from fastapi import APIRouter, HTTPException, Security
from fastapi.security import APIKeyHeader

router = APIRouter(
    prefix="/leadfeeder",
    tags=["leadfeeder"],
)

api_key_header = APIKeyHeader(
    name="X-Api-Key",
    description="Your Leadfeeder API key",
)

LEADFEEDER_BASE_URL = "https://api.leadfeeder.com/v1"


@router.get("/accounts")
async def get_leadfeeder_accounts(
    api_key: str = Security(api_key_header),
):
    """Retrieve accounts using the current Leadfeeder API."""

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                f"{LEADFEEDER_BASE_URL}/accounts",
                headers={
                    "X-Api-Key": api_key,
                    "Accept": "application/json",
                },
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Leadfeeder API returned HTTP {response.status_code}",
            )

        return response.json()

    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Unable to connect to Leadfeeder",
        )
