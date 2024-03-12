from pydantic import BaseModel, EmailStr
from swiftmail.dependencies import PyObjectId


class Options(BaseModel):
    email: EmailStr
    mail_id: PyObjectId
    archieve: bool
    star: bool
    trash: bool
    read: bool
