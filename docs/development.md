# Development Guide

## Local Workflow

1. Start PostgreSQL.
2. Start the backend from `backend` with `.\mvnw.cmd spring-boot:run`.
3. Start the frontend from `frontend`.

## Code Organization

Frontend source lives in `frontend/src`:

- `assets`: static assets imported by React
- `components`: reusable UI components
- `layouts`: shared page shells
- `pages`: route-level screens
- `hooks`: reusable React hooks
- `lib`: API clients and utilities

Backend source lives in `backend/src/main/java/com/kavya/portfolio`:

- `config`: application configuration
- `controller`: HTTP API controllers
- `dto`: request and response objects
- `entity`: JPA persistence models
- `exception`: global API error handling and domain exceptions
- `repository`: database access
- `service`: business logic

## Testing

Frontend tests can be added under `frontend/src` next to the related component or in a future `frontend/tests` folder.

Backend tests should live under `backend/src/test/java`.

Run the backend suite with `.\mvnw.cmd test`. Integration tests use an embedded
PostgreSQL engine, so they verify PostgreSQL behavior without requiring a separate
test database.
