---
name: Collaboration split
description: Division of work between user (backend) and Claude (frontend) for Educhat
type: user
---

The user owns all backend development (Django APIs, models, migrations, etc.) and will not touch the frontend. Claude is solely responsible for all frontend code (React/TypeScript in the `frontend/` directory).

**Workflow:** User builds a backend API first, then asks Claude to implement the corresponding frontend feature.
