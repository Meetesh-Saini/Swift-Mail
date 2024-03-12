from datetime import datetime, timedelta, timezone
import jwt
from .config import get_settings
from swiftmail.schemas.auth import Token
import typing as t

settings = get_settings()


def create_access_token(data: Token) -> str:
    to_encode = data.model_dump()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.secret_key, algorithm=settings.algorithm
    )
    return encoded_jwt


def get_user(token: str) -> t.Union[Token, None]:
    try:
        data = jwt.decode(
            token, key=settings.secret_key, algorithms=[settings.algorithm]
        )
        return Token(email=data["email"])
    except:
        return None
