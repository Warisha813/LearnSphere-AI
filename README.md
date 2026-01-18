# LearnSphere AI — Full Project (Frontend + Backend)

LearnSphere AI is an interactive learning dashboard for students with AI-driven task recommendations, progress tracking, and gamification.

This repository contains:
- `frontend/` — React (Vite) app (client-side TF.js recommendation model)
- `backend/` — Node.js + Express REST API (MongoDB via Mongoose; local fallback)

## Features
- Add/view/complete tasks (Title, Subject, Difficulty, tags)
- AI recommendations (TensorFlow.js) with incremental training
- Progress tracking: points, badges, streaks
- Charts (Chart.js) and notifications
- Confetti animation on completion, modal to create tasks
- Tasks sortable/filterable
- Responsive design and localStorage fallback
- GitHub Pages-ready build (Vite base set to `./` and `public/404.html`)

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev      # Start development server
npm run build    # Build for production
```

The `dist/` folder contains the production build ready for static hosting:
- Deploy to GitHub Pages, Netlify, or Vercel
- Or copy `dist/` to your repo's `docs/` folder for GitHub Pages

### Backend (Optional)
```bash
cd backend
npm install
cp .env.example .env  # Configure MongoDB URI if needed
npm start            # Start the API server on port 4000
```

Optional: Run `npm run seed` to load placeholder tasks (requires MongoDB)

**Note:** If you don't run the backend, the frontend automatically falls back to `localStorage` with placeholder data.

## Deployment

The project is ready to deploy:
- **Frontend**: The Vite build is configured for GitHub Pages with base `./` and a `public/404.html` for client-side routing
- **Backend**: Can be deployed to any Node.js hosting service (Heroku, Railway, Render, etc.)

## Project Structure
```
LearnSphere-AI/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── data/
│   │   └── styles/
│   └── public/
└── backend/           # Express API
    ├── controllers/
    ├── models/
    ├── routes/
    └── db/
```