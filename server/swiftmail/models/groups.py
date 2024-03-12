from pydantic import BaseModel, EmailStr
import typing as t


class Groups(BaseModel):
    email: EmailStr
    group_name: str
    mail_group: t.List[str]
    labels: t.List[str]
