# Zukunft Service — Full-Stack Web Platform

A bilingual German/Arabic full-stack website built for **Zukunft Service**, a service company based in Dortmund, Germany.

The platform provides a modern multilingual website, service information, and a contact-request system connected to a dedicated backend for request processing, database storage, validation, and email notifications.

---

## Overview

Zukunft Service is a bilingual web platform supporting:

* 🇩🇪 German
* 🇸🇦 Arabic with full RTL support

The system allows visitors to:

* Browse the company's services
* Switch between German and Arabic
* Read detailed service information
* Submit contact requests
* Choose their preferred contact time
* Request WhatsApp communication
* Receive appropriate responses based on their selected language

Submitted contact requests are processed by the backend, stored in PostgreSQL, and forwarded to the configured business email.

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │      Visitor        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Next.js        │
                    │      Frontend        │
                    └──────────┬──────────┘
                               │
                         HTTP / JSON
                               │
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │       Backend       │
                    └──────┬───────┬──────┘
                           │       │
                ┌──────────┘       └──────────┐
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │   PostgreSQL    │          │  Email Service  │
       │    Database     │          │      SMTP       │
       └─────────────────┘          └────────┬────────┘
                                             │
                                             ▼
                                      Business Inbox
```

---

## Project Structure

```text
zukunft-service-web/
│
├── README.md
│
├── zukunft-service-backend/
│   ├── README.md
│   ├── app/
│   ├── alembic/
│   ├── requirements.txt
│   └── ...
│
└── zukunft-service-frontend/
    └── GermanyApp/
        ├── README.md
        ├── src/
        ├── public/
        ├── package.json
        └── ...
```

---

## Technology Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod
* Lucide React
* German / Arabic internationalization
* Full RTL support

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* SQLAlchemy
* Alembic
* PostgreSQL
* SlowAPI
* SMTP / Email service

---

## Core Features

### 🌍 Multilingual Website

The frontend supports German and Arabic with language-specific routing:

```text
/de
/ar
```

Arabic pages support proper RTL layout.

### 📋 Contact Request System

Visitors can submit:

* Service category
* Message
* Name
* Email
* Phone number
* WhatsApp preference
* Preferred contact time
* Language

### 🗄️ Database

Contact requests are stored in PostgreSQL and managed through SQLAlchemy.

Database schema changes are handled using Alembic migrations.

### 📧 Email Notifications

When a request is submitted successfully:

```text
Visitor
   ↓
Frontend
   ↓
FastAPI
   ↓
PostgreSQL
   ↓
Email Service
   ↓
Business Inbox
```

The visitor's email is handled through `Reply-To` rather than being used as the sender address.

### 🛡️ Backend Validation & Protection

The backend performs independent server-side validation including:

* Email validation
* Phone number validation
* Message length validation
* Service validation
* WhatsApp/phone dependency validation
* Honeypot validation
* Request timing checks
* IP-based rate limiting

Client-side validation is treated as a user-experience feature and not as a security boundary.

---

## Contact API

The primary backend endpoint is:

```http
POST /api/requests
```

Example request:

```json
{
  "service": "study-visa",
  "message": "I would like to get information about studying in Germany.",
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

Successful response:

```json
{
  "status": "ok"
}
```

Detailed API documentation and backend implementation are available in the backend README.

---

## Running the Project Locally

The frontend and backend are independent applications.

### 1. Clone the repository

```bash
git clone https://github.com/abdullahabodayya-jpg/zukunft-service-web.git
cd zukunft-service-web
```

---

### 2. Start the Backend

```bash
cd zukunft-service-backend
```

Create and activate a virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the backend `.env` file and database connection.

Run the API:

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

For complete backend setup instructions, see:

[`zukunft-service-backend/README.md`](./zukunft-service-backend/README.md)

---

### 3. Start the Frontend

Open another terminal:

```bash
cd zukunft-service-frontend/GermanyApp
```

Install dependencies:

```bash
npm ci
```

Configure `.env.local` using `.env.example`.

For local backend integration, configure:

```env
NEXT_PUBLIC_CONTACT_TRANSPORT=http
NEXT_PUBLIC_CONTACT_ENDPOINT=http://127.0.0.1:8000/api/requests
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

For complete frontend documentation, see:

[`zukunft-service-frontend/GermanyApp/README.md`](./zukunft-service-frontend/GermanyApp/README.md)

---

## Environment Variables

Environment variables are intentionally separated between frontend and backend.

### Frontend

Public configuration uses:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CONTACT_TRANSPORT=
NEXT_PUBLIC_CONTACT_ENDPOINT=
```

### Backend

Server-side configuration contains sensitive values such as:

```env
DATABASE_URL=
CONTACT_RECIPIENT_EMAIL=
MAIL_USERNAME=
MAIL_PASSWORD=
```

**Never commit `.env` or other files containing credentials or secrets.**

Only `.env.example` files should be committed.

---

## Testing

The contact flow can be tested end-to-end:

```text
Frontend Contact Form
        ↓
POST /api/requests
        ↓
FastAPI Validation
        ↓
Database Insert
        ↓
Email Notification
        ↓
Business Inbox
```

The backend can also be tested independently through FastAPI Swagger:

```text
http://127.0.0.1:8000/docs
```

A successful integration test should result in:

```text
HTTP 200
{
  "status": "ok"
}
```

and an email notification containing the submitted request.

---

## Security Considerations

The project implements several application-level protections:

* Server-side request validation
* Pydantic schemas
* Email validation
* Phone format validation
* Rate limiting
* Honeypot anti-bot field
* Minimum form interaction time
* Environment-based secrets
* Database migrations
* SMTP sender / Reply-To separation

Secrets and production credentials are never intended to be stored in source control.

---

## Documentation

Detailed documentation is maintained separately for each application:

| Component         | Documentation                                      |
| ----------------- | -------------------------------------------------- |
| Full project      | `README.md`                                        |
| Backend           | `zukunft-service-backend/README.md`                |
| Frontend          | `zukunft-service-frontend/GermanyApp/README.md`    |
| Frontend handoff  | `zukunft-service-frontend/GermanyApp/HANDOFF.md`   |
| Frontend planning | `zukunft-service-frontend/GermanyApp/docs/PLAN.md` |

---

## Project Status

The current version includes:

* Bilingual German / Arabic frontend
* RTL support
* Service pages
* Contact form
* FastAPI backend
* PostgreSQL integration
* SQLAlchemy models
* Alembic migrations
* Server-side validation
* Rate limiting
* Anti-bot protection
* Email notifications
* Frontend ↔ Backend integration
* End-to-end contact request testing

---

## Project Ownership

Developed for **Zukunft Service**.

All rights reserved unless otherwise specified by the project owners.
