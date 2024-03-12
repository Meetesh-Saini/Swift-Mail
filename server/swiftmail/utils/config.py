from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict
import os

DOTENV = os.path.join(os.path.dirname(__file__), os.pardir, ".env")


class Settings(BaseSettings):
    app_name: str = "Swift Mail API"
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    env_file: str = DOTENV

    model_config = SettingsConfigDict(env_file=env_file)


@lru_cache
def get_settings():
    return Settings()
