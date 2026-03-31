# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Local Development (Docker-based)

```bash
# Start all services (Django, PostgreSQL, Redis, Celery, Flower)
docker compose -f docker-compose.local.yml up -d

# Run management commands
docker compose -f docker-compose.local.yml run --rm django python manage.py migrate
docker compose -f docker-compose.local.yml run --rm django python manage.py createsuperuser

# Run tests
docker compose -f docker-compose.local.yml run --rm django pytest

# Run a single test file
docker compose -f docker-compose.local.yml run --rm django pytest educhat/users/tests/test_views.py

# Run a single test
docker compose -f docker-compose.local.yml run --rm django pytest educhat/users/tests/test_views.py::TestUserUpdateView::test_get_success_url
```

### Using `just` (task runner)

```bash
just build          # Build Docker image
just up             # Start containers
just down           # Stop containers
just logs [service] # View container logs
just manage [cmd]   # Run manage.py commands
```

### Without Docker (using uv)

```bash
uv run pytest                       # Run tests
uv run coverage run -m pytest       # Run tests with coverage
uv run coverage html                # Generate HTML coverage report
uv run mypy educhat                 # Type checking
```

### Linting

Pre-commit hooks run ruff (linting + formatting), djlint (templates), mypy, and django-upgrade. Run manually:

```bash
pre-commit run --all-files
```

## Architecture

### Stack

- **Django 6.0** + **Django REST Framework** — backend and API
- **PostgreSQL 18** — primary database
- **Redis 7.2** — cache backend and Celery broker
- **Celery 5.6** — async task queue; Celery Beat for scheduled tasks; Flower for monitoring
- **django-allauth** — authentication with email-based login and MFA support
- **drf-spectacular** — OpenAPI/Swagger schema at `/api/docs/`

### Project Layout

This is a Cookiecutter Django project. The `educhat/` subdirectory contains all Django apps:

- `educhat/users/` — the primary app: custom User model, DRF ViewSet, allauth integration
- `config/` — Django project settings (`base.py`, `local.py`, `production.py`, `test.py`), URL routing, Celery config
- `compose/` — Dockerfiles and compose service configs for local and production
- `.envs/` — environment variable files (`.local`, `.production`)

### Custom User Model

`educhat/users/models.py` — uses **email as `USERNAME_FIELD`** (not username). The `name` field replaces `first_name`/`last_name`. Always use `get_user_model()` rather than importing `User` directly.

### API Structure

- API router defined in `config/api_router.py` using DRF `DefaultRouter`
- Endpoints mounted at `/api/` in `config/urls.py`
- Auth token endpoint at `/api/auth-token/`
- Default permission class is `IsAuthenticated`
- User API: `/api/users/` (list/retrieve/update) and `/api/users/me/` (current user action)

### Settings Pattern

Settings are split by environment. `DJANGO_SETTINGS_MODULE` determines which is loaded. Test settings (`config/settings/test.py`) use a faster password hasher and in-memory SQLite.

### Testing

Tests use **pytest-django** and **Factory Boy** (`educhat/users/tests/factories.py`). Test files live under `tests/` (project-level) and per-app `tests/` directories.
