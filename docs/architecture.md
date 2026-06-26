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

## Future Modules

- Profile and hero content
- Projects and case studies
- Skills and experience timeline
- Contact form submissions
- Admin content management
- Analytics or visitor event tracking
