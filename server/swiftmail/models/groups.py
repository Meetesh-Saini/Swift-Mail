from pydantic import BaseModel, EmailStr
import typing as t
from datetime import datetime


class Groups(BaseModel):
    email: str
    group_name: str
    mail_group: t.List[str]
    labels: t.List[str]
