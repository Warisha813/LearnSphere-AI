# Backend (LearnSphere AI)

This backend provides a simple Express REST API with optional MongoDB persistence. If MongoDB is not configured, it falls back to `localTasks.json`.

Quick start:
1. Copy `.env.example` → `.env` and set `MONGODB_URI` if you want persistence.
2. npm install
3. npm run seed (optional, requires MongoDB)
4. npm start

Endpoints:
- GET /tasks
- POST /tasks
- PUT /tasks/:id/complete
- GET /stats