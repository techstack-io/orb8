from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="ORB8_", env_file=".env", extra="ignore")

    env: str = "development"
    database_url: str = "sqlite+aiosqlite:///./orb8.db"
    google_trends_api_key: str | None = None
    datacommons_api_key: str | None = None


@lru_cache
def get_settings() -> Settings:
    return Settings()
