
import httpx
from fastapi import APIRouter, HTTPException, Security
from fastapi.security import APIKeyHeader

router = APIRouter(prefix="/leadfeeder", tags=["leadfeeder"])

api_key_header = APIKeyHeader(
    name="X-Api-Key",
    description="Your existing legacy Leadfeeder API token",
)

LEADFEEDER_BASE_URL = "https://api.leadfeeder.com"


@router.get("/accounts")
async def get_leadfeeder_accounts(
    api_key: str = Security(api_key_header),
):
    """Retrieve accounts using the legacy Leadfeeder API."""

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                f"{LEADFEEDER_BASE_URL}/accounts",
                headers={
                    "Authorization": f"Token token={api_key}"
                },
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Legacy Leadfeeder API returned HTTP {response.status_code}",
            )

        return response.json()

    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Unable to connect to Leadfeeder",
        )
