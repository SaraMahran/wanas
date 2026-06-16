# Wanas ونس — Project Context for Claude

## What is Wanas
A personal quotes platform where users discover hand-picked quotes from real books, matched to their current mood through AI semantic search. Name means warmth, comfort, companionship in Arabic.

## Stack
- Frontend: React (Vite) on Vercel
- Backend: Django + Django REST Framework on Railway
- Database: PostgreSQL + pgvector on Railway
- AI: sentence-transformers for mood-to-quote semantic matching
- Repo: GitHub monorepo, feature branch workflow

## Repo
- GitHub: https://github.com/SaraMahran/wanas
- Branching: main (protected, PRs only) → dev → feature/* fix/* chore/*
- Active branch: feature/django-setup

## Deployments
- Frontend: Vercel (wanas project, connected to SaraMahran/wanas, build from frontend/dist)
- Backend: Railway (not yet deployed)

## Project Structure
```
wanas/
├── backend/
│   ├── venv/           # Python venv, gitignored
│   ├── config/         # Django project (settings, urls, wsgi) — NOT YET CREATED
│   ├── .env            # Gitignored, never pushed
│   └── requirements.txt — NOT YET CREATED
├── frontend/
│   ├── node_modules/   # gitignored
│   ├── src/
│   └── package.json
├── docs/
├── .gitignore
├── CLAUDE.md
└── README.md
```

## Color Palette
Light mode: #E8A672, #FFC97D, #FFAD8A, #E88472, #FF7E7D
Dark mode: warm near-black background (#1A1410), off-white text (#F5EDE3), palette colors used as accents

## Logo
Generated via Artlist AI. Arabic calligraphy ونس with oval stroke, "Wanas" in English below, warm brown/gold on cream background.

## Task Board
Trello: https://trello.com/b/... (Wanas ونس board)

## Environment Variables
backend/.env (never pushed to GitHub):
- SECRET_KEY: long random string Django uses to sign cookies/sessions/tokens. Placeholder locally, real value generated at https://djecrety.ir and set on Railway at deployment.
- DEBUG: True locally, False in production on Railway
- DATABASE_URL: sqlite:///db.sqlite3 locally, Railway PostgreSQL URL in production (format: postgresql://user:password@host:port/dbname)

## Completed
- [x] Initialized git repo locally
- [x] Created README.md with project description and stack
- [x] Pushed main branch to GitHub
- [x] Created dev branch, pushed to GitHub
- [x] Created folder structure: backend/, frontend/, docs/
- [x] Created .gitignore (covers venv, __pycache__, .env, node_modules, IDE files, OS files)
- [x] Created CLAUDE.md at repo root
- [x] Created .env in backend/ with commented placeholders
- [x] Scaffolded React app with Vite inside frontend/
- [x] Connected Vercel to SaraMahran/wanas repo
- [x] Configured Vercel build: cd frontend && npm run build, output frontend/dist

## In Progress
- [ ] Vercel deployment confirming live URL
- [ ] Create PR: feature/django-setup into dev
- [ ] Create PR: dev into main
- [ ] Create backend venv and activate
- [ ] Install Django, DRF, django-environ, psycopg2-binary
- [ ] Scaffold Django project with config/ using django-admin startproject config .
- [ ] Update settings.py to use django-environ and DRF
- [ ] Run Django locally and confirm it works
- [ ] Connect to Railway PostgreSQL

## Backlog
- [ ] Connect React frontend to Django with a test endpoint
- [ ] Django auth with SimpleJWT
- [ ] Database models: Quote, UserProfile, Mood
- [ ] pgvector setup + embedding field on Quote
- [ ] Quote CRUD endpoints
- [ ] sentence-transformers embedding pipeline
- [ ] Mood matching endpoint
- [ ] UI design and styling
- [ ] User profile page
- [ ] Mood history
- [ ] Admin panel for adding quotes
- [ ] LinkedIn share button per quote
- [ ] Docs folder

## Key Decisions
- Railway over Supabase: Django needs its own backend, Supabase would replace Django entirely
- pgvector over separate vector DB: keeps everything in one Railway PostgreSQL instance
- React on Vercel + Django on Railway: standard split, both free tiers are generous
- Docs live in /docs folder in repo, not external tools
- Trello over ClickUp: simpler for solo project
- SECRET_KEY never hardcoded, always in .env which is gitignored
- SQLite locally for development, Railway PostgreSQL in production
- Vercel build uses custom commands (cd frontend && npm run build) because monorepo root directory cannot be changed in Vercel UI for this setup
- Commits went directly to main during initial setup (acceptable for project init), PR flow enforced from this point forward