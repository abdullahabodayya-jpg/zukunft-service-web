# Zukunft Service — Backend

Backend API for the **Zukunft Service** website.

The backend receives contact/service requests from the frontend, validates and stores them in PostgreSQL, and sends an email notification to the configured recipient.

---

## Overview

The backend is built with:

* **Python**
* **FastAPI**
* **PostgreSQL**
* **SQLAlchemy**
* **Alembic**
* **Pydantic**
* **FastAPI-Mail / aiosmtplib**
* **SlowAPI** for rate limiting
* **Uvicorn** as the ASGI server

### Architecture

```text
Frontend
   │
   │ POST /api/requests
   ▼
FastAPI
   │
   ├── Validation
   │
   ├── Rate Limiting
   │
   ├── Honeypot / Bot Checks
   │
   ├── PostgreSQL
   │
   └── Email Notification
          │
          ▼
     Contact Inbox
```

---

# Project Structure

```text
zukunft-service-backend/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── email_service.py
│   └── logging_config.py
│
├── alembic/
│   ├── versions/
│   │   ├── 39b247901e87_create_requests_table.py
│   │   └── 427d408999fd_add_request_timestamps_and_indexes.py
│   ├── env.py
│   ├── script.py.mako
│   └── README
│
├── alembic.ini
├── requirements.txt
├── .env.example
└── README.md
```

---

# Requirements

Before running the backend, make sure you have:

* Python 3.12+
* PostgreSQL
* Git

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/abdullahabodayya-jpg/zukunft-service-web.git
```

Navigate to the backend:

```bash
cd zukunft-service-web/zukunft-service-backend
```

---

## 2. Create a virtual environment

### Windows

```powershell
py -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

You should see:

```text
(venv)
```

in your terminal.

---

## 3. Install dependencies

```powershell
pip install -r requirements.txt
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```text
zukunft-service-backend/
└── .env
```

Use `.env.example` as the template.

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

CONTACT_RECIPIENT_EMAIL=your-recipient@example.com

MAIL_USERNAME=your-sender@example.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=your-sender@example.com
MAIL_SERVER=your-smtp-server
MAIL_PORT=587
MAIL_STARTTLS=true
MAIL_SSL_TLS=false
```

### Important

Never commit `.env` to GitHub.

The `.env.example` file contains only configuration placeholders and is safe to commit.

---

# Database

The application uses **PostgreSQL**.

The database connection is configured through:

```env
DATABASE_URL=
```

Example:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/zukunft_service
```

---

# Database Migrations

Database schema changes are managed using **Alembic**.

To apply all migrations:

```powershell
alembic upgrade head
```

To check the current migration:

```powershell
alembic current
```

To view migration history:

```powershell
alembic history
```

When making a schema change, create a new migration instead of manually modifying the database structure.

---

# Running the Backend

From:

```text
zukunft-service-backend/
```

run:

```powershell
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

Alternative documentation:

```text
http://127.0.0.1:8000/redoc
```

---

# API

## Create Service Request

```http
POST /api/requests
```

### Request

```json
{
  "service": "study-visa",
  "message": "I would like to get information about studying in Germany and the requirements for obtaining a student visa.",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+962799999999",
  "whatsappOptIn": true,
  "preferredTime": "afternoon",
  "locale": "de",
  "company": "",
  "elapsedMs": 10000
}
```

---

# Supported Services

The `service` field accepts:

```text
authorities
marriage-translation
study-visa
finance
real-estate
cleaning
other
```

---

# Validation

All incoming requests are validated server-side.

### Message

```text
Minimum: 10 characters
Maximum: 4000 characters
```

### Name

```text
Minimum: 2 characters
Maximum: 100 characters
```

### Email

The email address must be a valid email address.

### Phone

The phone number must contain a valid phone-number format.

Examples:

```text
0799999999
+962799999999
+49 177 3825632
+49-177-3825632
```

Invalid values such as:

```text
John Doe
abc123
hello
```

are rejected.

An empty phone number is allowed when WhatsApp contact is not selected.

If:

```json
"whatsappOptIn": true
```

a phone number is required.

---

# Bot Protection

The contact form includes basic anti-bot mechanisms.

## Honeypot

The frontend sends:

```json
"company": ""
```

This field is intended to remain empty.

Non-empty values can be treated as automated submissions.

## Elapsed Time

The frontend also sends:

```json
"elapsedMs": 10000
```

Very short submission times can be treated as suspicious automated requests.

## Rate Limiting

The API uses **SlowAPI** to limit repeated requests and reduce abuse.

---

# Response Format

### Successful Request

```http
200 OK
```

```json
{
  "status": "ok"
}
```

### Validation Error

```http
422 Unprocessable Content
```

Example:

```json
{
  "status": "validation",
  "fieldErrors": {
    "phone": "Invalid phone number"
  }
}
```

### Server / Network Error

The API may return an appropriate `4xx` or `5xx` response.

---

# Email Notifications

After successfully creating a service request:

```text
Frontend
   ↓
POST /api/requests
   ↓
Validation
   ↓
Database
   ↓
Email notification
```

The notification is sent to:

```env
CONTACT_RECIPIENT_EMAIL=
```

The visitor's email address should be used as **Reply-To**, not as the sender address.

This keeps the configured sender aligned with the email provider's SPF/DKIM configuration.

---

# Security

The following practices are implemented:

* Server-side input validation
* Email validation
* Phone-number validation
* Rate limiting
* Honeypot validation
* Submission-time validation
* Environment variables for secrets
* Database access through SQLAlchemy
* SMTP credentials stored outside the source code
* `.env` excluded from version control

### Never commit

```text
.env
venv/
__pycache__/
*.pyc
```

---

# Development

Start the backend in development mode:

```powershell
uvicorn app.main:app --reload
```

The `--reload` option automatically restarts the server when source files change.

---

# Testing the API

The easiest way to test the API during development is through:

```text
http://127.0.0.1:8000/docs
```

Open:

```text
POST /api/requests
```

and select **Try it out**.

Example valid request:

```json
{
  "service": "study-visa",
  "message": "I would like to ask about studying in Germany and the requirements for obtaining a student visa.",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+962799999999",
  "whatsappOptIn": true,
  "preferredTime": "afternoon",
  "locale": "de",
  "company": "",
  "elapsedMs": 10000
}
```

Expected response:

```json
{
  "status": "ok"
}
```

---

# Frontend Integration

The frontend communicates with the backend through:

```http
POST /api/requests
```

The frontend endpoint is configured through:

```env
NEXT_PUBLIC_CONTACT_ENDPOINT=
```

and the transport must be configured as:

```env
NEXT_PUBLIC_CONTACT_TRANSPORT=http
```

Example:

```env
NEXT_PUBLIC_CONTACT_TRANSPORT=http
NEXT_PUBLIC_CONTACT_ENDPOINT=http://127.0.0.1:8000/api/requests
```

---

# Production

Before deploying to production:

1. Configure the production PostgreSQL database.
2. Configure production environment variables.
3. Configure the production SMTP account.
4. Run database migrations:

```bash
alembic upgrade head
```

5. Configure CORS for the production frontend domain.
6. Configure HTTPS.
7. Disable development-only settings.
8. Verify rate limiting.
9. Test the contact form from the production frontend.
10. Verify that email notifications arrive correctly.

---

# Git Workflow

The backend is part of the main project repository.

Check the current state:

```bash
git status
```

Stage changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Describe your changes"
```

Push:

```bash
git push
```

---

# Troubleshooting

## `ModuleNotFoundError`

Example:

```text
ModuleNotFoundError: No module named 'slowapi'
```

Make sure the virtual environment is activated:

```powershell
.\venv\Scripts\Activate.ps1
```

Then install dependencies:

```powershell
pip install -r requirements.txt
```

---

## Uvicorn launcher error

If Windows reports an error such as:

```text
Fatal error in launcher: Unable to create process
```

verify that the active virtual environment belongs to the current backend directory.

Check Python:

```powershell
python --version
```

Check Uvicorn:

```powershell
python -m uvicorn app.main:app --reload
```

Using `python -m uvicorn` can avoid stale Windows launcher paths.

---

## Database connection error

Check:

```env
DATABASE_URL=
```

and make sure:

* PostgreSQL is running.
* Database exists.
* Username is correct.
* Password is correct.
* Host and port are correct.

---

## Email is not sent

Check:

```env
CONTACT_RECIPIENT_EMAIL=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_SERVER=
MAIL_PORT=
```

For email providers requiring two-factor authentication, use the provider's **App Password** where applicable instead of the normal account password.

---

# Contact Request Data Flow

```text
User
 │
 ▼
Contact Form
 │
 ▼
Frontend Validation
 │
 ▼
POST /api/requests
 │
 ▼
FastAPI
 │
 ├── Pydantic Validation
 │
 ├── Rate Limit
 │
 ├── Honeypot Check
 │
 ├── Bot Timing Check
 │
 ▼
PostgreSQL
 │
 ▼
Email Service
 │
 ▼
Recipient Inbox
```

---

# Project Status

The backend currently supports:

* Contact/service request submission
* PostgreSQL persistence
* Database migrations
* Server-side validation
* Email validation
* Phone validation
* WhatsApp opt-in handling
* Email notifications
* Rate limiting
* Basic anti-bot protection
* Structured API responses
* Development API documentation through Swagger/OpenAPI

---

## License

This project is developed for **Zukunft Service**.

All rights reserved unless otherwise specified by the project owners.
