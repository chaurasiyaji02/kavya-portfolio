# Database

## Local Database

Create a dedicated local user and database:

```sql
create user portfolio_user with password 'replace_with_a_secure_password';
create database kavya_portfolio owner portfolio_user;
```

Copy `backend/.env.example` to `backend/.env` and set the matching password.

## Conventions

- Use PostgreSQL-specific features only when they simplify the model meaningfully.
- Add schema changes as versioned migrations in `backend/src/main/resources/db/migration`.
- Keep portfolio seed/demo data separate from production migrations.
- Prefer clear table names such as `projects`, `skills`, `experiences`, and `contact_messages`.

The initial migration creates only the `system_messages` table used by the sample
connection endpoint.
