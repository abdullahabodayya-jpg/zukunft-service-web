import logging
import os

from fastapi import BackgroundTasks, Depends, FastAPI, HTTPException
from fastapi import Request as FastAPIRequest
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session

from app.database import get_db
from app.email_service import send_request_notification_with_retry
from app.logging_config import configure_logging
from app.models import Request
from app.schemas import RequestCreate, RequestCreateResponse

configure_logging()

logger = logging.getLogger(__name__)



cors_origins = [
    origin.strip()
    for origin in os.environ["CORS_ORIGINS"].split(",")
    if origin.strip()
]

app = FastAPI(
    title = "Zukunft Service API",
    version = "1.0.0"
)

limiter = Limiter(key_func=get_remote_address)

async def rate_limit_exception_handler(
    request: FastAPIRequest,
    exc: Exception,
) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={
            "status": "rate_limit",
            "message": "Too many requests. Please try again later.",
        },
    )

app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    rate_limit_exception_handler,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=False,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request,
    exc: RequestValidationError,
):
    field_errors = {}

    for error in exc.errors():
        location = error.get("loc", ())
        message = error.get("msg", "Invalid value")

        if location:
            field = str(location[-1])
        else:
            field = "general"

        field_errors[field] = message

    return JSONResponse(
        status_code=422,
        content={
            "status": "validation",
            "fieldErrors": field_errors,
        },
    )



@app.get("/")
def root():
    return {
        "message" : "Zukunft srevice Api is running "
    }

@app.post(
    "/api/requests",
    response_model=RequestCreateResponse,
    status_code=200,
)
@limiter.limit("5/10minutes")
async def create_request(
    request: FastAPIRequest,
    payload: RequestCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),  # noqa: B008
):
    # Anti-spam: honeypot
    if payload.company.strip():
        logger.warning("Spam request rejected: honeypot was filled")
        raise HTTPException(
            status_code=422,
            detail="Invalid request",
        )

    # Anti-spam: form was submitted too quickly
    if payload.elapsedMs < 3000:
        logger.warning(
            "Spam request rejected: elapsed time was %s ms",
            payload.elapsedMs,
        )
        raise HTTPException(
            status_code=422,
            detail="Invalid request",
        )

    new_request = Request(
        name=payload.name,
        email=str(payload.email),
        phone=payload.phone,
        service=payload.service,
        message=payload.message,
        whatsapp_opt_in=payload.whatsappOptIn,
        preferred_time=payload.preferredTime,
        locale=payload.locale,
    )

    try:
        db.add(new_request)
        db.commit()
        db.refresh(new_request)

        logger.info(
            "Service request created successfully: request_id=%s",
            new_request.id,
        )
    except Exception:
        db.rollback()

        logger.exception("Failed to create service request")

        raise HTTPException(
            status_code=500,
            detail="Failed to create service request",
        )

    background_tasks.add_task(
        send_request_notification_with_retry,
        new_request,
    )

    return {
        "status": "ok",
    }


