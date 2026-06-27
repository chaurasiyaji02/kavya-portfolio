# Architecture

## Overview

The project is split into three main layers:

- `frontend`: React client for the portfolio experience.
- `backend`: Spring Boot API for dynamic content and integrations.
- `database`: PostgreSQL for persistent portfolio data.

## Planned Boundaries

- The frontend should communicate with the backend through typed API helpers in `frontend/src/lib`.
- The backend should keep controllers thin and place business rules in service classes.
- Database schema changes should be added as migrations under `backend/src/main/resources/db/migration`.

## Backend Boundaries

The backend uses versioned routes under `/api/v1` and separates HTTP contracts,
business logic, persistence, and JPA models into controller, DTO, service,
repository, and entity packages. Flyway owns schema creation while Hibernate runs
in validation mode.

Spring Security is present as infrastructure only. Requests are currently stateless
and permitted without authentication until a dedicated authentication design is
implemented.

Public content reads live under `/api/v1/{resource}`. Content mutations and contact
message management live under `/api/v1/admin/**`; these routes remain open only
until admin authentication is implemented.

## Future Modules

- Profile and hero content
- Projects and case studies
- Skills and experience timeline
- Contact form submissions
- Admin content management
- Analytics or visitor event tracking
