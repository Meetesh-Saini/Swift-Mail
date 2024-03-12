from pydantic import BaseModel, EmailStr
import typing as t


class Labels(BaseModel):
    email: EmailStr
    label: t.List[str]
