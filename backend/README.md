# Kavya Portfolio Backend

Spring Boot foundation for the versioned portfolio REST API.

## Stack

- Java 21
- Spring Boot 3.5
- Spring Web, Data JPA, Security, Validation, and Actuator
- PostgreSQL with Flyway migrations
- springdoc OpenAPI and Swagger UI
- Maven Wrapper

Spring Security uses stateless JWT authentication for `/api/v1/admin/**`.
Passwords are BCrypt hashed and the initial administrator is seeded from
environment variables.

## Local Setup

1. Install Java 21 or newer and PostgreSQL 14 or newer.
2. Create the database and application user:

```sql
create user portfolio_user with password 'replace_with_a_secure_password';
create database kavya_portfolio owner portfolio_user;
```

3. Create the local environment file:

```powershell
Copy-Item .env.example .env
```

4. Update `DB_PASSWORD`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in
   `.env`.
5. Run the API:

```powershell
.\mvnw.cmd spring-boot:run
```

The API starts at `http://localhost:8080`.

## Verification

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/health
Invoke-RestMethod http://localhost:8080/api/v1/sample
```

Available development endpoints:

- Health: `GET /api/v1/health`
- Sample connection: `GET /api/v1/sample`
- Projects: `GET /api/v1/projects`
- Skills: `GET /api/v1/skills`
- Education: `GET /api/v1/education`
- Certifications: `GET /api/v1/certifications`
- Experience: `GET /api/v1/experiences`
- Social links: `GET /api/v1/social-links`
- Resume profile: `GET /api/v1/resume-profile`
- Contact submission: `POST /api/v1/contact-messages`
- Admin login: `POST /api/v1/auth/login`
- Admin CRUD: `/api/v1/admin/**` with `Authorization: Bearer <token>`
- Actuator health: `GET /api/v1/actuator/health`
- OpenAPI JSON: `GET /api-docs`
- Swagger UI: `/swagger-ui.html`

## Tests

```powershell
.\mvnw.cmd test
```

The integration suite starts a real embedded PostgreSQL process, applies Flyway
migrations, boots the HTTP server, and verifies authentication, protected CRUD,
public content, contact messages, validation, error handling, OpenAPI, and CORS.

## Package Structure

```text
com.kavya.portfolio
  config/       CORS, Security, and OpenAPI configuration
  controller/   Versioned REST controllers
  dto/          API request and response contracts
  entity/       JPA entities
  exception/    Domain exceptions and global API error handling
  repository/   Spring Data repositories
  service/      Business and integration logic
```

Add future schema changes as new versioned files under
`src/main/resources/db/migration`. Do not edit an applied migration.
