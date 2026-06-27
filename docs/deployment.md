# Production Deployment

This guide deploys the monorepo as three services:

- React frontend on Vercel
- Spring Boot backend on Render or Railway
- PostgreSQL on Neon or Supabase

Deploy the database first, then the backend, and finally the frontend.

## 1. Production Preflight

Run the release checks:

```powershell
Set-Location frontend
npm ci
npm run lint
npm run build

Set-Location ../backend
.\mvnw.cmd verify
```

Generate production-only values for:

- `JWT_SECRET`: at least 32 random bytes
- `ADMIN_PASSWORD`: a unique strong password
- Database credentials

Do not reuse the example values.

## 2. PostgreSQL

### Neon

1. Create a Neon project and database.
2. Open **Connect** and copy the direct connection string.
3. Convert it to JDBC form for `DB_URL`:

```text
jdbc:postgresql://HOST/DATABASE?sslmode=require
```

Use the direct connection for this application because Flyway runs migrations
at startup. Neon recommends direct connections for migrations rather than
transaction-pooled connections.

Official references:

- [Neon connection pooling](https://neon.com/docs/connect/connection-pooling)
- [Neon connection troubleshooting](https://neon.com/docs/connect/connection-errors)

### Supabase

1. Create a Supabase project.
2. Open **Connect** in the project dashboard.
3. Use the direct connection when the backend host supports IPv6.
4. For an IPv4-only backend, use the session pooler connection.
5. Prefix the PostgreSQL URL with `jdbc:` and require SSL.

Example:

```text
jdbc:postgresql://POOLER_HOST:5432/postgres?sslmode=require
```

Avoid a transaction-mode pooler for Flyway migrations.

Official references:

- [Connect to Supabase Postgres](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Supabase SSL enforcement](https://supabase.com/docs/guides/platform/ssl-enforcement)

## 3. Spring Boot Backend

Production variables are documented in
[`backend/.env.production.example`](../backend/.env.production.example).

Required values:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
CORS_ALLOWED_ORIGINS
JWT_SECRET
JWT_EXPIRATION
ADMIN_EMAIL
ADMIN_PASSWORD
```

Flyway applies pending migrations automatically when the service starts.
The admin seed creates the configured account only when that email does not
already exist.

### Render

Render recommends Docker for JVM applications. This repository includes
`backend/Dockerfile`.

1. Create a new Web Service from the GitHub repository.
2. Set the root directory to `backend`.
3. Select Docker as the runtime.
4. Add the production environment variables.
5. Set the health check path to `/api/v1/actuator/health`.
6. Deploy and copy the public backend URL.

The application accepts Render's `PORT` automatically.

Official references:

- [Docker on Render](https://render.com/docs/docker)
- [Render environment variables](https://render.com/docs/configure-environment-variables)

### Railway

1. Create a project and deploy from the GitHub repository.
2. Set the backend service root directory to `/backend`.
3. Railway can build the included Dockerfile.
4. Add the production variables in the service **Variables** tab.
5. Generate a public domain under **Networking**.
6. Configure `/api/v1/actuator/health` as the health check.

The application accepts Railway's `PORT` automatically.

Official references:

- [Deploy Spring Boot on Railway](https://docs.railway.com/guides/spring-boot)
- [Deploy a Railway monorepo](https://docs.railway.com/guides/deploying-a-monorepo)
- [Railway variables](https://docs.railway.com/variables)

## 4. CORS

`CORS_ALLOWED_ORIGINS` must contain exact frontend origins separated by commas:

```text
CORS_ALLOWED_ORIGINS=https://portfolio.example.com,https://www.portfolio.example.com
```

Rules:

- Do not add trailing slashes.
- Do not use `*`; the API allows credentials.
- Include only trusted production and intentionally supported preview origins.
- Redeploy the backend after changing origins.
- Confirm browser requests return the expected `Access-Control-Allow-Origin`.

## 5. React Frontend on Vercel

1. Import the GitHub repository into Vercel.
2. Set the project root directory to `frontend`.
3. Use the Vite preset.
4. Use build command `npm run build`.
5. Use output directory `dist`.
6. Add:

```text
VITE_API_BASE_URL=https://YOUR_BACKEND_HOST/api/v1
VITE_SITE_URL=https://YOUR_FRONTEND_HOST
VITE_OG_IMAGE_URL=https://YOUR_FRONTEND_HOST/og-image.png
```

The included `frontend/vercel.json` rewrites application routes to
`index.html`, so `/resume`, `/builder`, `/checker`, and `/admin/login` work on
direct navigation.

Vite variables are embedded at build time. Redeploy after changing them.

Official references:

- [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [Vercel environment variables](https://vercel.com/docs/environment-variables)

## 6. SEO Files

Before the production frontend deploy:

1. Replace `https://your-domain.example` in:
   - `frontend/public/robots.txt`
   - `frontend/public/sitemap.xml`
2. Confirm `VITE_SITE_URL` uses the same canonical origin.
3. Confirm `VITE_OG_IMAGE_URL` is publicly accessible.
4. Submit `/sitemap.xml` to the relevant search engine tools after launch.

The admin login route uses `noindex, nofollow` metadata and `/admin` is
disallowed in `robots.txt`. Authentication remains the actual security control.

## 7. Production Verification

Check:

- `/`, `/resume`, `/builder`, `/checker`, and `/admin/login` load directly.
- `/robots.txt`, `/sitemap.xml`, and `/og-image.png` return `200`.
- Public portfolio API requests succeed from the production frontend.
- Admin login succeeds and protected API requests return `401` without a JWT.
- Contact submission succeeds.
- Builder and Checker never transmit visitor resume data and retain it only
  in-browser. Public portfolio content requests may still run on these routes.
- Open Graph title, description, canonical URL, and image use production URLs.
- Backend health reports `UP`.
