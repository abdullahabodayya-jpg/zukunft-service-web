from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field, model_validator


class RequestCreate(BaseModel):
    service: Literal[
        "authorities",
        "marriage-translation",
        "study-visa",
        "finance",
        "real-estate",
        "cleaning",
        "other",
    ]

    message: str = Field(min_length=10, max_length=4000)

    name: str = Field(min_length=2, max_length=100)

    email: EmailStr

    phone: str = Field(default="", max_length=30)

    whatsappOptIn: bool

    preferredTime: Literal["morning", "afternoon", "any"]

    locale: Literal["de", "ar"]

    company: str = Field(default="", max_length=100)

    elapsedMs: float = Field(ge=0)

    @model_validator(mode="after")
    def validate_whatsapp_phone(self):
        if self.whatsappOptIn and not self.phone.strip():
            raise ValueError(
                "Phone is required when WhatsApp is selected"
            )

        return self


class RequestResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str
    service: str
    message: str
    whatsapp_opt_in: bool
    preferred_time: str
    locale: str
    status: str
    created_at: datetime
    updated_at: datetime


class RequestCreateResponse(BaseModel):
    status: Literal["ok"]