# Kavya Portfolio

A full-stack personal portfolio for Kavya Chaurasiya with dynamic portfolio
content, reusable resume previews, private browser-only career tools, and a
JWT-protected content dashboard.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 18, React Router, Tailwind CSS, Framer Motion, Vite |
| Backend | Java 21, Spring Boot, Spring Security, Spring Data JPA, Maven |
| Database | PostgreSQL, Flyway |
| API docs | springdoc OpenAPI and Swagger UI |
| Testing | JUnit integration tests with embedded PostgreSQL |

## Features

- Responsive personal portfolio with projects, skills, education,
  certifications, experience, social links, and contact details
- Dark and light themes, motion, loading states, and accessible navigation
- Five responsive, print-friendly resume templates
- Visitor resume builder saved only to browser `localStorage`
- Resume checker that runs entirely in the browser
- Backend-powered contact form
- JWT and BCrypt protected admin dashboard
- CRUD, ordering, validation, and public-content refresh for portfolio data
- SEO metadata, Open Graph preview, robots rules, and sitemap basics

Visitor Builder and Checker data is never sent to the backend or an external
service.

## Project Structure

```text
kavya-portfolio/
  frontend/                 React and Vite application
  backend/                  Spring Boot API
  docs/                     Architecture, database, and deployment notes
  README.md
```

## Screenshots

Add release screenshots under `docs/screenshots/` using these suggested names:

| View | Suggested file |
| --- | --- |
| Portfolio homepage | `docs/screenshots/home.png` |
| Resume showcase | `docs/screenshots/resume.png` |
| Resume builder | `docs/screenshots/builder.png` |
| Admin dashboard | `docs/screenshots/admin.png` |

## Prerequisites

- Node.js 20+
- Java 21+
- PostgreSQL 14+

## Local Setup

1. Clone the repository and enter it.
2. Create a PostgreSQL user and database:

```sql
create user portfolio_user with password 'replace_with_a_secure_password';
create database kavya_portfolio owner portfolio_user;
```

3. Create local environment files:

```powershell
Copy-Item frontend/.env.example frontend/.env
Copy-Item backend/.env.example backend/.env
```

4. Set `DB_PASSWORD`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in
   `backend/.env`.
5. Start the backend:

```powershell
Set-Location backend
.\mvnw.cmd spring-boot:run
```

6. In another terminal, start the frontend:

```powershell
Set-Location frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`; the API runs at
`http://localhost:8080`.

## Environment Variables

### Frontend

| Variable | Purpose |
| --- | --- |
| `VITE_APP_NAME` | Display/application name |
| `VITE_API_BASE_URL` | Versioned API URL ending in `/api/v1` |
| `VITE_SITE_URL` | Public frontend origin used for canonical metadata |
| `VITE_OG_IMAGE_URL` | Absolute Open Graph preview image URL |

Use [`frontend/.env.production.example`](frontend/.env.production.example) as
the production template.

### Backend

| Variable | Purpose |
| --- | --- |
| `PORT` / `SERVER_PORT` | Runtime HTTP port |
| `DB_URL` | Full PostgreSQL JDBC URL |
| `DB_USERNAME`, `DB_PASSWORD` | Database credentials |
| `DB_POOL_SIZE`, `DB_MIN_IDLE` | HikariCP pool limits |
| `CORS_ALLOWED_ORIGINS` | Exact comma-separated frontend origins |
| `JWT_SECRET` | JWT signing secret of at least 32 random bytes |
| `JWT_EXPIRATION` | ISO-8601 duration such as `PT2H` |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Initial BCrypt-hashed admin seed |

Use [`backend/.env.production.example`](backend/.env.production.example) as the
production template. Never commit real `.env` files or credentials.

## Verification

Frontend:

```powershell
Set-Location frontend
npm run lint
npm run build
```

Backend:

```powershell
Set-Location backend
.\mvnw.cmd verify
```

API documentation is available locally at:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/api-docs`
- Health: `http://localhost:8080/api/v1/actuator/health`

## Deployment

Recommended deployment order:

1. Provision PostgreSQL on Neon or Supabase.
2. Deploy the Spring Boot backend on Render or Railway.
3. Deploy the React frontend on Vercel.
4. Set the final frontend URL in backend CORS configuration.
5. Replace `your-domain.example` in `frontend/public/robots.txt` and
   `frontend/public/sitemap.xml`.

See the complete [deployment guide](docs/deployment.md) for platform-specific
settings, CORS guidance, database connection details, and production checks.

## Documentation

- [Architecture](docs/architecture.md)
- [Database conventions](docs/database.md)
- [Development notes](docs/development.md)
- [Production deployment](docs/deployment.md)
