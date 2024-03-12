from fastapi.testclient import TestClient
from pydantic import ValidationError
from swiftmail.main import app
from swiftmail.utils.config import get_settings
from swiftmail.utils.auth import create_access_token, get_user
from swiftmail.schemas.auth import Token
import pytest
import jwt

client = TestClient(app)
settings = get_settings()


def test_email_str():
    with pytest.raises(ValidationError) as err:
        Token(email="hello")

    with pytest.raises(ValidationError) as err:
        Token(email="hello@h")

    with pytest.raises(ValidationError) as err:
        Token(email="hello@hello.")

    Token(email="hello@hello.com")


def test_create_access_token():
    data = Token(email="hello@h.com")
    token = create_access_token(data)

    decoded_email = jwt.decode(token, key=settings.secret_key, algorithms=[settings.algorithm])["email"]

    assert decoded_email == data.email

def test_get_user():
    data = Token(email="hello@hello.com")
    token = create_access_token(data)
    decoded_user = get_user(token)

    assert decoded_user == data 

    token += "0"
    decoded_user = get_user(token)
    assert decoded_user is None