# Database

## Local Database

Default local database name:

```text
kavya_portfolio
```

## Conventions

- Use PostgreSQL-specific features only when they simplify the model meaningfully.
- Add schema changes as versioned migrations in `backend/src/main/resources/db/migration`.
- Keep seed/demo data separate from production migrations.
- Prefer clear table names such as `projects`, `skills`, `experiences`, and `contact_messages`.

No schema has been created yet because this scaffold does not implement portfolio features.
