import asyncio
import logging
import os
from html import escape

from dotenv import load_dotenv
from fastapi_mail import (
    ConnectionConfig,
    FastMail,
    MessageSchema,
    MessageType,
    NameEmail,
)
from pydantic import SecretStr

from app.models import Request

load_dotenv()

logger = logging.getLogger(__name__)


def get_env(name: str) -> str:
    value = os.getenv(name)

    if value is None or not value.strip():
        raise ValueError(f"{name} is not set")

    return value


def get_bool_env(name: str) -> bool:
    value = get_env(name).lower()

    if value not in {"true", "false"}:
        raise ValueError(
            f"{name} must be 'True' or 'False'"
        )

    return value == "true"


def get_int_env(name: str) -> int:
    value = get_env(name)

    try:
        return int(value)
    except ValueError as exc:
        raise ValueError(
            f"{name} must be a valid integer"
        ) from exc


MAIL_USERNAME = get_env("MAIL_USERNAME")
MAIL_PASSWORD = get_env("MAIL_PASSWORD")
MAIL_FROM = get_env("MAIL_FROM")
CONTACT_RECIPIENT_EMAIL = get_env("CONTACT_RECIPIENT_EMAIL")
MAIL_PORT = get_int_env("MAIL_PORT")
MAIL_SERVER = get_env("MAIL_SERVER")
MAIL_STARTTLS = get_bool_env("MAIL_STARTTLS")
MAIL_SSL_TLS = get_bool_env("MAIL_SSL_TLS")


conf = ConnectionConfig(
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=SecretStr(MAIL_PASSWORD),
    MAIL_FROM=MAIL_FROM,
    MAIL_PORT=MAIL_PORT,
    MAIL_SERVER=MAIL_SERVER,
    MAIL_STARTTLS=MAIL_STARTTLS,
    MAIL_SSL_TLS=MAIL_SSL_TLS,
    USE_CREDENTIALS=True,
)

mail = FastMail(conf)


EMAIL_RETRY_DELAYS = (0, 30, 120, 300, 900)


async def send_request_notification(request: Request) -> None:
    name = escape(request.name)
    email = escape(request.email) if request.email else "Not provided"
    phone = escape(request.phone)
    service = escape(request.service)
    message_text = escape(request.message)
    preferred_time = escape(request.preferred_time)
    locale = escape(request.locale)
    whatsapp_opt_in = "Yes" if request.whatsapp_opt_in else "No"
    status = escape(request.status)

    # Prevent CR/LF characters from entering the email subject.
    subject_name = " ".join(request.name.splitlines()).strip()

    message = MessageSchema(
        subject=f"New Service Request - {subject_name}",
        recipients=[
            NameEmail("", CONTACT_RECIPIENT_EMAIL)
        ],
        reply_to=[
            NameEmail("", request.email)
        ],
        body=f"""
        <h2>New Service Request</h2>

        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>

        <p><strong>Service:</strong> {service}</p>

        <p>
            <strong>Preferred Contact Time:</strong>
            {preferred_time}
        </p>

        <p>
            <strong>WhatsApp Opt-In:</strong>
            {whatsapp_opt_in}
        </p>

        <p>
            <strong>Language:</strong>
            {locale}
        </p>

        <h3>Message</h3>
        <p>{message_text}</p>

        <hr>

        <p><strong>Status:</strong> {status}</p>
        <p><strong>Request ID:</strong> {request.id}</p>
        """,
        subtype=MessageType.html,
    )

    await mail.send_message(message)


async def send_request_notification_with_retry(
    request: Request,
) -> None:
    total_attempts = len(EMAIL_RETRY_DELAYS)

    for attempt, delay in enumerate(
        EMAIL_RETRY_DELAYS,
        start=1,
    ):
        if delay > 0:
            await asyncio.sleep(delay)

        try:
            await send_request_notification(request)

            logger.info(
                "Email notification sent successfully "
                "for request ID %s on attempt %s/%s",
                request.id,
                attempt,
                total_attempts,
            )

            return

        except Exception:
            logger.exception(
                "Email notification failed "
                "for request ID %s on attempt %s/%s",
                request.id,
                attempt,
                total_attempts,
            )

    logger.error(
        "Email notification permanently failed "
        "for request ID %s after %s attempts",
        request.id,
        total_attempts,
    )
