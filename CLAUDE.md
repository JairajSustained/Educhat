# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Memory

Project-specific memory is stored in `.claude/memory/`. Read `MEMORY.md` there at the start of each session for context on collaboration conventions and decisions.

## Project Overview

Educhat is an AI-powered educational platform with a Django REST API backend and a React/TypeScript SPA frontend. Features include an AI chat interface, file management, quiz generation, mind maps (ReactFlow), and text-to-speech notes.

## Development Commands

### Backend (Django)

```bash
cd backend

# Install dependencies (uses uv, not pip)
uv sync

# Run migrations
python manage.py migrate

# Start dev server (http://localhost:8000)
python manage.py runserver

# Create superuser
python manage.py createsuperuser
```

### Frontend (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Lint
npm run lint

# Production build
npm run build
```

### API Proxy

The Vite dev server proxies `/api/*` requests to `http://localhost:8000`. Both servers must be running during development.

## Architecture

### Backend (`backend/`)

- **Django 6.0.4** with **Django REST Framework** and **simplejwt**
- Package manager: **uv** (not pip/poetry — always use `uv sync` and `uv add`)
- `educhat/` — Django project settings, URL conf, WSGI
- `apps/users/` — Only app currently; custom User model (email as USERNAME_FIELD), Google OAuth flow
- `AUTH_USER_MODEL = 'users.User'` — always use `get_user_model()` when referencing the User model
- Backend URLs are largely unwired — `educhat/urls.py` only has admin; the Google OAuth view exists but isn't connected yet

### Frontend (`frontend/src/`)

- **React 18 + TypeScript + Vite**
- Routing: **React Router 6** — protected routes via `ProtectedRoute` wrapper in `App.tsx`
- State: **Zustand** stores in `stores/` (`authStore.ts`, `chatStore.ts`) — auth state persists to localStorage
- API: native `fetch` (not axios) — API client/helpers in `utils/`
- Path alias: `@/` → `src/`
- Pages in `pages/`, reusable UI primitives in `components/ui/`, layout in `components/layout/`

### Authentication Flow

- Frontend uses `@react-oauth/google` on `LoginPage.tsx` to obtain a Google credential
- User info decoded from the Google JWT and stored in Zustand `authStore`
- Backend has `apps/users/views/google_login_signup.py` for full OAuth code exchange + JWT issuance (simplejwt), but the URL route is not yet wired into `urls.py`

### Environment Variables

**Backend** (`backend/.env`):
- `SECRET_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `FRONTEND_URL` — defaults to `http://localhost:3000` in settings, update if needed

**Frontend** (`frontend/.env` — copy from `.env.example`):
- `VITE_GOOGLE_CLIENT_ID` — required for Google OAuth
- `VITE_API_URL` — optional, falls back to Vite proxy

### Database

- Development: SQLite (`backend/db.sqlite3`)
- Production target: PostgreSQL + pgvector (for AI embeddings — package already installed)

## Key Dependencies

| Layer | Notable packages |
|-------|-----------------|
| Backend | `djangorestframework`, `djangorestframework-simplejwt`, `pydantic-ai`, `pgvector`, `google-auth` |
| Frontend | `react-router-dom`, `zustand`, `tailwindcss`, `reactflow`, `recharts`, `react-markdown`, `react-dropzone`, `lucide-react` |