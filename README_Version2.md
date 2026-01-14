# LearnSphere AI — Full Project (Frontend + Backend)

LearnSphere AI is an interactive learning dashboard for students with AI-driven task recommendations, progress tracking, and gamification.

This archive contains:
- `frontend/` — React (Vite) app (client-side TF.js recommendation model)
- `backend/` — Node.js + Express REST API (MongoDB via Mongoose; local fallback)

Features
- Add/view/complete tasks (Title, Subject, Difficulty, tags)
- AI recommendations (TensorFlow.js) with incremental training
- Progress tracking: points, badges, streaks
- Charts (Chart.js) and notifications
- Confetti animation on completion, modal to create tasks
- Tasks sortable/filterable
- Responsive design and localStorage fallback
- GitHub Pages-ready build (Vite base set to `./` and `public/404.html`)

How to prepare a ZIP and deploy
1. Extract the project, keep the root folder structure.
2. Frontend
   - cd frontend
   - npm install
   - npm run build
   - The `dist/` folder contains the site ready for static hosting. You can:
     - Deploy `dist/` to GitHub Pages (via `gh-pages`) or Netlify/Vercel.
     - Or copy `dist/` to your repo's `docs/` folder and point GitHub Pages there (main/docs).
3. Backend (optional)
   - cd backend
   - npm install
   - Copy `.env.example` → `.env` and set `MONGODB_URI` if you want persistent storage
   - npm run seed (optional) to load placeholder tasks (requires MongoDB)
   - npm start
4. If you don't run the backend, the frontend falls back to `localStorage`/placeholder dataset automatically.

If you want, I can:
- Produce a single ZIP and upload it to a provided location OR
- Create a GitHub repo/PR (need repo name & permission).

Enjoy! — Warisha813, when you're ready I can adapt anything further.