# 🚀 Nextalx Deployment Guide (Railway)

This guide describes how to deploy Nextalx to **Railway** as three services in one project:

1. **PostgreSQL** — managed database (Railway plugin)
2. **nextalx-api** — Spring Boot backend (root: `backend/nextalx-api`)
3. **nextalx-web** — React/Vite frontend (root: `frontend`)

> Access model: this guide assumes a **public demo / portfolio** deployment. The API currently has **no authentication** — do not put real or sensitive data behind it until auth is added (see "Before you go further" at the end).

---

## ✅ Pre-flight checklist (must be done before deploying)

- [x] **`AssetCategory` / `Category` duplication resolved.** The dead `AssetCategory*` stack (entity, controller, service, mapper, repository, DTOs, exceptions) that mapped to the non-existent `asset_categories` table has been removed. `Asset` maps to `Category` (`categories` table), so Hibernate `validate` now passes on startup.
- [x] **CORS origin is configurable.** `config/CorsConfig.java` reads allowed origins from the `APP_CORS_ALLOWED_ORIGINS` env var (comma-separated), defaulting to the local Vite dev ports. Set it to the deployed frontend URL in Railway.
- [ ] Confirm the project builds locally: `cd backend/nextalx-api && ./mvnw -DskipTests clean package` and `cd frontend && npm ci && npm run build`.
- [ ] Commit and push everything to GitHub (Railway deploys from a repo).

---

## 1. Create the Railway project + PostgreSQL

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo** → select the Nextalx repo.
2. In the project, click **+ New** → **Database** → **Add PostgreSQL**.
3. Railway provisions Postgres and exposes connection variables (`PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`, and a ready-made `DATABASE_URL`).

---

## 2. Deploy the backend service (`nextalx-api`)

1. **+ New** → **GitHub Repo** → pick the same repo (or use the auto-created service).
2. Open the service → **Settings** → set **Root Directory** to `backend/nextalx-api`.
   - The included `nixpacks.toml` handles the build (`mvn clean package`) and start (`java -jar target/nextalx-api-0.0.1-SNAPSHOT.jar`).
3. **Settings → Networking** → **Generate Domain** (gives you e.g. `https://nextalx-api-production.up.railway.app`).
4. **Variables** — add:

   | Variable | Value |
   |----------|-------|
   | `SPRING_DATASOURCE_URL` | `jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}` |
   | `SPRING_DATASOURCE_USERNAME` | `${{Postgres.PGUSER}}` |
   | `SPRING_DATASOURCE_PASSWORD` | `${{Postgres.PGPASSWORD}}` |
   | `JPA_SHOW_SQL` | `false` |
   | `APP_CORS_ALLOWED_ORIGINS` | *(the frontend URL from step 3 of section 3, once you have it)* |

   > `${{Postgres.PGHOST}}` etc. are Railway **reference variables** — type them exactly; Railway resolves them to the Postgres service's values. `PORT` is injected by Railway automatically and is read by `server.port: ${PORT:8080}`.

5. Deploy. Watch the logs: Flyway should run migrations `V1 → V5` on the fresh database, then Hibernate `validate` should pass. Verify:
   - `https://<backend-domain>/actuator/health` → `{"status":"UP"}`
   - `https://<backend-domain>/swagger-ui/index.html` → API docs (consider disabling in a real prod).

---

## 3. Deploy the frontend service (`nextalx-web`)

1. **+ New** → **GitHub Repo** → same repo.
2. **Settings** → **Root Directory** = `frontend`.
   - The included `frontend/nixpacks.toml` runs `npm ci`, `npm run build`, and serves `dist` via `serve` on Railway's `$PORT`.
3. **Variables** — add the build-time API URL:

   | Variable | Value |
   |----------|-------|
   | `VITE_API_URL` | `https://<backend-domain>/api/v1` |

   > Vite bakes `VITE_*` variables in at **build time**, so set this **before** the build and **redeploy** if you change it.
4. **Settings → Networking** → **Generate Domain** → this is your public site URL.
5. Go back to the **backend** service and set `APP_CORS_ALLOWED_ORIGINS` to this frontend URL, then redeploy the backend.

---

## 4. Verify end-to-end

- Open the frontend domain → the Dashboard should load real stats from the backend.
- Create a department / employee / asset → confirm it persists (reload the page).
- Check the browser devtools **Network** tab: requests should go to `https://<backend-domain>/api/v1/...` and return `200`, with no CORS errors.

---

## Alternative: frontend on Vercel/Netlify

A Vite SPA deploys extremely well on Vercel or Netlify (often simpler than Railway for static frontends). If you prefer that: set the build command to `npm run build`, the output/publish directory to `dist`, and add the `VITE_API_URL` environment variable. Keep Postgres + backend on Railway.

---

## Before you go further (recommended hardening)

- **Authentication:** the API is fully open. For anything beyond a throwaway demo, add at least a login (Spring Security + JWT) or protect write endpoints.
- **Disable Swagger** in production, or protect it.
- **Restrict Actuator** to `health` only (`management.endpoints.web.exposure.include=health`).
- **Rotate the local DB password** (`postgre`) — never reuse it in production; Railway generates its own.
- **Add CI** (build + test on push) before auto-deploying.
