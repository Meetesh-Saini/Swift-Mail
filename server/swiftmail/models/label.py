from pydantic import BaseModel, EmailStr
import typing as t
from datetime import datetime


class Labels(BaseModel):
    email: str
    label: t.List[str]
