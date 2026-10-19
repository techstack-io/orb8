
from datetime import date, timedelta

import httpx
from fastapi import APIRouter, HTTPException, Query, Security
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

CLARK_ACCOUNT_ID = "281219"


# -----------------------------------
# Retrieve Leadfeeder accounts
# -----------------------------------

@router.get("/accounts")
async def get_leadfeeder_accounts(
    api_key: str = Security(api_key_header),
):
    """Retrieve accounts accessible to the API key."""

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
                detail=f"Leadfeeder returned HTTP {response.status_code}",
            )

        return response.json()

    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Unable to connect to Leadfeeder",
        )


# -----------------------------------
# Retrieve company website visitors
# -----------------------------------

@router.get("/companies")
async def get_leadfeeder_companies(
    api_key: str = Security(api_key_header),
    days: int = Query(default=7, ge=1, le=30),
):
    """Retrieve recent website visitor companies."""

    end_date = date.today()
    start_date = end_date - timedelta(days=days)

    params = {
        "account_id": CLARK_ACCOUNT_ID,
        "start_date": start_date.isoformat(),
        "end_date": end_date.isoformat(),
        "page[num]": 1,
        "page[size]": 10,
        "include": "company",
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                f"{LEADFEEDER_BASE_URL}/web-visits/companies",
                headers={
                    "X-Api-Key": api_key,
                    "Accept": "application/json",
                },
                params=params,
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Leadfeeder returned HTTP {response.status_code}",
            )

        return response.json()

    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Unable to connect to Leadfeeder",
        )
