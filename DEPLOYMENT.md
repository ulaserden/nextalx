# 🚀 Nextalx Deployment Guide

Nextalx runs as three free-tier pieces:

| Piece | Platform | What it is |
|-------|----------|------------|
| **nextalx-web** | [Vercel](https://vercel.com) | React/Vite SPA (`frontend`) |
| **nextalx-api** | [Render](https://render.com) | Spring Boot service, built from `backend/nextalx-api/Dockerfile` |
| **Database** | [Neon](https://neon.tech) | Serverless PostgreSQL |

Live: <https://nextalx.vercel.app> → <https://nextalx-api.onrender.com>

> Access model: this is a **public demo / portfolio** deployment. The API has **no authentication** — do not put real or sensitive data behind it until auth is added (see "Hardening" at the end).

> Previously deployed on Railway. That guide is gone; `render.yaml` and the keep-alive workflow in this repo describe the current setup.

---

## 1. Database — Neon

1. Create a project. Pick the region closest to the Render region you will choose in step 2 (`eu-central-1` pairs with Render's Frankfurt).
2. Open **Connect** and copy the connection string. **Two things matter here:**

   - **Turn "Connection pooling" OFF.** The pooled endpoint (`...-pooler.<region>...`) runs PgBouncer in transaction mode. Flyway takes a *session-level* advisory lock before migrating, which transaction pooling does not preserve — migrations hang or fail. Hikari does its own pooling anyway.
   - **Drop `channel_binding=require`.** That is libpq syntax; the PostgreSQL JDBC driver spells it `channelBinding`. Keep only `sslmode=require`.

3. Split the result into the three variables Render needs:

   Neon gives you:
   ```
   postgresql://neondb_owner:PASSWORD@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

   | Variable | Value |
   |----------|-------|
   | `SPRING_DATASOURCE_URL` | `jdbc:postgresql://ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require` |
   | `SPRING_DATASOURCE_USERNAME` | `neondb_owner` |
   | `SPRING_DATASOURCE_PASSWORD` | *the password from the string* |

   Note the `jdbc:` prefix and that credentials move out of the URL.

### Why `minimum-idle` is 0

Neon's free tier bills **compute time, not queries**: 100 CU-hours per month, and the compute only suspends while *no client is connected*. A pool holding one idle connection open pins it awake and burns the month's allowance in about two weeks.

`application.yaml` therefore sets `spring.datasource.hikari.minimum-idle: 0` with a 60-second `idle-timeout`, so the pool drains to zero between requests and Neon actually suspends. On a database with a fixed always-on compute, set `DB_POOL_MIN_IDLE=1` to get the old behaviour back.

---

## 2. Backend — Render

The repo ships a Blueprint, so this is mostly click-through.

1. **New → Blueprint** → pick this repo → branch `main`. Render reads [`render.yaml`](render.yaml) and creates the `nextalx-api` web service.
2. It will prompt for the three `SPRING_DATASOURCE_*` values from step 1 — they are marked `sync: false` so they are never committed.
3. First build takes 5–8 minutes (Maven downloads the dependency tree). Watch the logs for:
   ```
   Migrating schema "public" to version "1 - initial schema"
   ...
   Successfully applied 8 migrations
   Started NextalxApiApplication in X seconds
   ```

If you would rather configure it by hand: root directory `backend/nextalx-api`, runtime Docker, instance type Free, health check path `/actuator/health/liveness`.

### Why the health check is `liveness`, not `health`

`/actuator/health` includes Spring's `DataSourceHealthIndicator`, which runs a validation query. Render probes the health path continuously, so pointing it there would wake Neon every single time and defeat the scale-to-zero described above. The `liveness` group excludes the datasource check.

You can still use `/actuator/health` yourself for a full check — it just should not be what the platform polls.

### JVM sizing

Render's free instance has 512 MB. The `Dockerfile` sets `JAVA_OPTS="-XX:MaxRAMPercentage=65.0 -XX:+UseSerialGC -Xss512k"`: at 75% the heap leaves too little for metaspace and thread stacks, and the parallel collector reserves more than a single-core instance can use. Override `JAVA_OPTS` on a larger plan.

---

## 3. Frontend — Vercel

1. Import the repo, root directory `frontend`. The framework preset (Vite) and `npm run build` → `dist` are detected automatically; [`frontend/vercel.json`](frontend/vercel.json) handles SPA routing.
2. Add the environment variable:

   | Variable | Value |
   |----------|-------|
   | `VITE_API_URL` | `https://nextalx-api.onrender.com/api/v1` |

3. **Redeploy without the build cache.**

   Vite inlines `VITE_*` variables at **build time**, not runtime. Saving the variable changes nothing on its own, and a cache-reusing redeploy can ship the old value. To confirm which URL actually shipped:

   ```bash
   curl -s https://nextalx.vercel.app/assets/axiosClient-*.js | grep -o 'https://[^"]*api/v1'
   ```

4. Back on Render, `APP_CORS_ALLOWED_ORIGINS` must list the Vercel origin. It is already set to `https://nextalx.vercel.app` in `render.yaml`; add more origins comma-separated if you deploy elsewhere.

   Preview deployments get generated URLs (`nextalx-<hash>.vercel.app`) which are **not** covered — `CorsConfig` matches exact origins, not patterns. Previews will fail CORS against production; point them at a separate API or add their origins explicitly.

---

## 4. Keeping it awake

Render free web services sleep after **15 minutes** of inactivity and take about a minute to wake. For a portfolio link that is the difference between "works" and "looks broken".

[`.github/workflows/keep-alive.yml`](.github/workflows/keep-alive.yml) pings `/actuator/health/liveness` every 10 minutes. Set the repository variable it reads:

**Settings → Secrets and variables → Actions → Variables** → `API_BASE_URL` = `https://nextalx-api.onrender.com`

### The quota arithmetic

Render grants **750 instance-hours per workspace per calendar month**. A service kept awake 24/7 burns 744 of them in a 31-day month — under the cap, but with no room for a second free service. The cron therefore runs `*/10 5-23 * * *` (UTC), roughly 590 hours a month. Change it to `*/10 * * * *` for round-the-clock, and then keep this as the workspace's only free service.

### Two things that will silently break this

- **GitHub disables scheduled workflows after 60 days without repository activity.** No commits for two months and the pings stop, with no notification.
- **`schedule:` is best-effort.** Runs are regularly delayed 5–15 minutes under load, so an occasional cold start slips through the 15-minute window.

If either matters, an external pinger ([cron-job.org](https://cron-job.org), UptimeRobot) fires on time and does not depend on repo activity.

---

## 5. Verify end-to-end

```bash
curl https://nextalx-api.onrender.com/actuator/health
# {"status":"UP","groups":["liveness","readiness"]}

curl https://nextalx-api.onrender.com/api/v1/dashboard/stats
# {"totalEmployees":16,"totalAssets":28,"assignedAssets":15,"availableAssets":8}

# CORS: the Vercel origin is allowed, anything else is refused
curl -si -X OPTIONS -H "Origin: https://nextalx.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     https://nextalx-api.onrender.com/api/v1/dashboard/stats | grep -i access-control
```

Expect the first request after an idle period to take several seconds — that is Neon resuming, and it is the scale-to-zero working as intended.

Then open the site and create a department: it should persist across a reload, with no CORS errors in the console.

---

## Demo data

`V7__seed_demo_data.sql` populates 5 departments, 16 employees, 7 categories, 28 assets and 19 assignments, so a fresh deployment does not open with an empty dashboard. Rows are keyed naturally and guarded with `ON CONFLICT`, so it is a no-op against a populated database.

Asset statuses are kept consistent with assignments: the 15 assets with an open assignment are `ASSIGNED`, and no asset has two rows with a `NULL` returned_date — `V6`'s partial unique index would reject that. `NX-LT-0001` deliberately carries two assignments (returned by one employee, reissued to another) to exercise that index rather than merely avoid it.

Drop this migration if you want a genuinely empty production database.

---

## Hardening (before this is anything but a demo)

- **Authentication.** The API is fully open. `app.api-key` (`API_KEY` env var) gates `/api/v1/**` behind an `X-API-Key` header when set, but the frontend does not send one — it is a stopgap, not a login. Add Spring Security + JWT, or at minimum protect the write endpoints.
- **No delete endpoints exist.** Removal is modelled as deactivation (`PATCH /{id}/deactivate`), and the dashboard counts rows regardless of status. Deliberate, but worth knowing before you rely on those counts.
- **Disable Swagger in production**, or put it behind auth.
- **Actuator** is already limited to `health` and `info` with `show-details: never`.
- **Never reuse the local password** (`postgre` in `application.yaml`) anywhere real. Neon generates its own; rotate it if it is ever pasted into a screenshot or an issue.
