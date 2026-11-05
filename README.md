# Longevita Backend Starter

NestJS + TypeScript + PostgreSQL + Prisma starter for the existing React/Vite frontend.

## Requirements

- Node.js LTS
- PostgreSQL running locally or a managed PostgreSQL database
- npm

## Setup

1. Copy `.env.example` to `.env`.
2. Update `DATABASE_URL` with your PostgreSQL username, password, host, port, and database name.
3. Replace `JWT_SECRET` with a strong random secret. Never commit `.env`.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Create the database `longevita` in PostgreSQL (or change the database name in `DATABASE_URL`).
6. Generate Prisma Client and run the initial migration:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

7. Start the API:

   ```bash
   npm run start:dev
   ```

## URLs

- Health check: `http://localhost:4000/api/v1/health`
- Swagger: `http://localhost:4000/api/docs`

## Initial endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me` (send `Authorization: Bearer <accessToken>`)

## Example registration body

```json
{
  "fullName": "Priya Sharma",
  "email": "priya@example.com",
  "password": "Use-a-strong-password-123"
}
```

## Frontend integration

Keep the frontend in its existing folder. Use `http://localhost:4000/api/v1` as the API base URL during local development. For Vite, add `VITE_API_BASE_URL=http://localhost:4000/api/v1` to the frontend `.env` file.

Example:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const result = await response.json();
if (!response.ok) throw new Error(result.message || 'Login failed');
```

Store tokens carefully. For production, prefer short-lived access tokens and a properly implemented refresh-token/session design; avoid persistent browser storage for sensitive authentication tokens where possible. This starter intentionally does not implement refresh tokens, email verification, password reset, MFA, rate limiting, or role guards yet. Add and test these before production.

Registration always creates a `MEMBER`; never accept a role from the public registration request. Create staff/admin accounts through a separately authorized administrative workflow.


## Run the full stack with Docker Compose

Prerequisites: Docker Desktop (or Docker Engine with Compose).

1. Copy `.env.example` to `.env`.
2. Set `JWT_SECRET` to a strong random secret in `.env`.
3. Set `POSTGRES_PASSWORD` in `.env` to a development database password. The Compose file uses this for PostgreSQL and the API connection.
4. For Docker Compose, the API uses hostname `db` inside the Docker network; do not use `localhost` in the Compose database URL.
5. Start the containers:

   ```bash
   docker compose up --build
   ```

Compose starts PostgreSQL, waits for its health check, runs the initial Prisma development migration, and starts the NestJS API.

URLs:
- API health check: http://localhost:4000/api/v1/health
- Swagger: http://localhost:4000/api/docs
- PostgreSQL from your host: localhost:5432

To stop containers:

```bash
docker compose down
```

To stop and also delete the local database volume (destructive; removes stored database data):

```bash
docker compose down -v
```

Do not use the development Compose command or default development password in production. For production, use managed secrets, a non-root runtime image, controlled `prisma migrate deploy` releases, hardened networking, and a managed PostgreSQL service or appropriately secured database container.
