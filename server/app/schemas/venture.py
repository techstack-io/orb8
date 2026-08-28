from pydantic import BaseModel, ConfigDict, HttpUrl


class VentureCreate(BaseModel):
    name: str
    description: str
    website: HttpUrl | None = None


class VentureOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    description: str
    website: str | None = None
