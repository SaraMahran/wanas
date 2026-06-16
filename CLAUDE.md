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
- Frontend: Vercel (connected to SaraMahran/wanas, build command: cd frontend && npm run build, output: frontend/dist)
- Backend: Railway (not yet deployed)

## Project Structure
```
wanas/
├── backend/
│   ├── venv/              # Python venv, gitignored
│   ├── config/
│   │   ├── settings.py    # Django config, uses django-environ
│   │   ├── urls.py        # Main router: admin/, api/, api/token/, api/token/refresh/
│   │   └── wsgi.py
│   ├── users/             # Users app
│   │   ├── views.py       # health_check, RegisterView
│   │   ├── urls.py        # health/, register/
│   │   ├── serializers.py # RegisterSerializer
│   │   └── models.py
│   ├── .env               # Gitignored, never pushed
│   ├── db.sqlite3         # Local dev DB, gitignored
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── node_modules/      # gitignored
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
- ALLOWED_HOSTS: localhost,127.0.0.1 locally, Railway domain in production
- DATABASE_URL: sqlite:///db.sqlite3 locally, Railway PostgreSQL URL in production (format: postgresql://user:password@host:port/dbname)
- CORS_ALLOWED_ORIGINS: http://localhost:5173 locally, Vercel URL in production

## Working API Endpoints
- GET  /api/health/         — server health check, no auth required
- POST /api/register/       — create new user {username, email, password}
- POST /api/token/          — login, returns access + refresh JWT tokens
- POST /api/token/refresh/  — get new access token using refresh token

## Django App Structure
- config/: project-level settings and main URL router
- users/: handles registration and auth. Views: health_check, RegisterView. Serializer: RegisterSerializer uses create_user to hash passwords.
- Third party apps in INSTALLED_APPS: rest_framework (DRF), corsheaders (CORS)
- JWT: access token 60min, refresh token 7 days, rotate refresh tokens on use

## Completed
- [x] Initialized git repo locally
- [x] Created README.md with project description and stack
- [x] Pushed main branch to GitHub
- [x] Created dev branch, pushed to GitHub
- [x] Created folder structure: backend/, frontend/, docs/
- [x] Created .gitignore
- [x] Created CLAUDE.md at repo root
- [x] Created .env in backend/ with commented placeholders
- [x] Scaffolded React app with Vite inside frontend/
- [x] Connected Vercel to SaraMahran/wanas repo
- [x] Configured Vercel build: cd frontend && npm run build, output frontend/dist
- [x] Scaffolded Django project with config/ using django-admin
- [x] Installed DRF, django-environ, psycopg2-binary, simplejwt, corsheaders
- [x] Configured settings.py with environ, DRF, JWT, CORS
- [x] Created users app with health_check endpoint and RegisterView
- [x] Confirmed Django runs locally at http://127.0.0.1:8000
- [x] Confirmed GET /api/health/ returns 200

## In Progress
- [ ] PR: feature/django-setup into dev, then dev into main
- [ ] Connect React frontend to Django health endpoint (test the connection)
- [ ] Connect to Railway PostgreSQL

## Backlog
- [ ] Django auth with SimpleJWT login/logout in React
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
- [ ] Deploy backend to Railway

## Key Decisions
- Railway over Supabase: Django needs its own backend, Supabase would replace Django entirely
- pgvector over separate vector DB: keeps everything in one Railway PostgreSQL instance
- React on Vercel + Django on Railway: standard split, both free tiers are generous
- Docs live in /docs folder in repo, not external tools
- Trello over ClickUp: simpler for solo project
- SECRET_KEY never hardcoded, always in .env which is gitignored
- SQLite locally for development, Railway PostgreSQL in production
- Vercel build uses custom commands because monorepo root directory cannot be changed in Vercel UI
- corsheaders and rest_framework registered in INSTALLED_APPS because they add middleware and interfaces Django needs to load