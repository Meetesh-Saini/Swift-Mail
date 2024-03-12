from pydantic import BaseModel, EmailStr
import typing as t
from datetime import datetime


class Mails(BaseModel):
    from_: EmailStr
    to: EmailStr
    subject: str
    body: str
    labels: t.List[str]
    date: datetime
