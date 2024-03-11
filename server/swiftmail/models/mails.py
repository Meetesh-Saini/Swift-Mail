from pydantic import BaseModel, EmailStr
import typing as t
from datetime import datetime


class Mails(BaseModel):
    from_: str  # Enforces valid email format
    to: str
    subject: str  # Optional field
    body: str  # Default value for disabled
    labels: t.List[str]
    date: datetime
