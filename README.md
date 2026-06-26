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
- Maven 3.9+
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
mvn spring-boot:run
```

The backend runs on `http://localhost:8080` by default.

## Database

Create a local PostgreSQL database before starting the backend:

```sql
CREATE DATABASE kavya_portfolio;
```

See [docs/database.md](docs/database.md) for planned database conventions.

## Development Notes

This is an initial project scaffold only. Portfolio pages, admin tools, content models, authentication, and deployment workflows are intentionally left for future iterations.
