# Kavya Portfolio

Modern dynamic portfolio website scaffold.

## Stack

- Frontend: React, Tailwind CSS, Framer Motion, Vite
- Backend: Java Spring Boot
- Database: PostgreSQL

## Project Structure

```text
kavya-portfolio/
  frontend/      React application
  backend/       Spring Boot API
  docs/          Architecture and setup notes
```

## Prerequisites

- Node.js 20+
- Java 21+
- PostgreSQL 15+

## Environment Setup

Copy the example environment files before running services:

```powershell
Copy-Item .env.example .env
Copy-Item frontend/.env.example frontend/.env
Copy-Item backend/.env.example backend/.env
```

Update the copied `.env` files with local database credentials and API URLs.

## Frontend

```powershell
Set-Location frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## Backend

```powershell
Set-Location backend
.\mvnw.cmd spring-boot:run
```

The backend runs on `http://localhost:8080` by default.
See [backend/README.md](backend/README.md) for database creation, API endpoints,
Swagger documentation, and integration test instructions.

## Database

Create a local PostgreSQL database before starting the backend:

```sql
CREATE DATABASE kavya_portfolio;
```

See [docs/database.md](docs/database.md) for database conventions.

## Development Notes

The backend currently provides a versioned foundation and connection-check API.
Portfolio content APIs, authentication, and admin workflows remain intentionally
out of scope.
