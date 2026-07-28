# 🐳 Dockerization Roadmap & Technical Notes

This document outlines the architectural plan, multi-stage Docker configurations, and orchestration strategy for containerizing the **nextalx** full-stack application (Spring Boot + Vite/React).

---

## 🏗️ Architecture Overview

The project is containerized using a **Dual-Container Architecture** to keep the backend and frontend independent, secure, and optimized for production deployment (e.g., Railway, Render, or AWS).

- **Backend:** Spring Boot running inside a lightweight JRE environment on port `8080`.
- **Frontend:** Vite + React compiled into static assets and served via an ultra-fast **Nginx** server on port `80`.

---

## 📋 Project Structure Reference

Ensure your repository matches the target layout below before executing the builds:

```text
nextalx/
├── backend/                  # Spring Boot Project
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile.backend
├── frontend/                 # Vite / React Project
│   ├── src/
│   ├── package.json
│   └── Dockerfile.frontend
├── .dockerignore             # Global ignore rules
├── docker-compose.yml        # Local orchestration
└── DOCKER_ROADMAP.md         # This documentation
```

---

## 🗺️ Next Steps

- [ ] Add `backend/Dockerfile.backend` (multi-stage Maven build → JRE runtime).
- [ ] Add `frontend/Dockerfile.frontend` (Vite build → Nginx static serve).
- [ ] Add root `.dockerignore` and `docker-compose.yml` for local orchestration.
- [ ] Wire a PostgreSQL service into `docker-compose.yml` and externalize DB credentials via environment variables.
