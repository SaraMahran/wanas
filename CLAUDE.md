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
- Active branch: feature/auth-and-models

## Deployments
- Frontend: Vercel — wanas-delta.vercel.app (connected to SaraMahran/wanas, build: cd frontend && npm run build, output: frontend/dist)
- Backend: Railway (not yet deployed)

## Project Structure
```
wanas/
├── backend/
│   ├── venv/              # Python venv, gitignored
│   ├── config/
│   │   ├── settings.py    # Django config, uses django-environ
│   │   ├── urls.py        # Main router
│   │   └── wsgi.py
│   ├── users/
│   │   ├── models.py      # UserProfile, signals for auto-create on User save
│   │   ├── views.py       # health_check, RegisterView, logout, me
│   │   ├── urls.py        # health/, register/, logout/, me/
│   │   └── serializers.py # RegisterSerializer, UserProfileSerializer
│   ├── quotes/
│   │   ├── models.py      # Quote, Mood
│   │   └── (views/urls coming next)
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

## Environment Variables
backend/.env (never pushed):
- SECRET_KEY: placeholder locally, generate real one at https://djecrety.ir for Railway
- DEBUG: True locally, False in production
- ALLOWED_HOSTS: localhost,127.0.0.1 locally, Railway domain in production
- DATABASE_URL: sqlite:///db.sqlite3 locally, Railway PostgreSQL URL in production
- CORS_ALLOWED_ORIGINS: http://localhost:5173 locally, Vercel URL in production

## Database Models
### users/models.py
- UserProfile: OneToOne with Django User, fields: bio, avatar_url, created_at
- Signals: post_save on User auto-creates and auto-saves UserProfile

### quotes/models.py
- Mood: name, emoji, description
- Quote: text, author, book, moods (ManyToMany to Mood), embedding (JSONField, will become pgvector later), added_by (FK to UserProfile), created_at

## Working API Endpoints
- GET  /api/health/         — server status, no auth
- POST /api/register/       — create user {username, email, password}
- POST /api/token/          — login, returns access + refresh JWT tokens
- POST /api/token/refresh/  — get new access token using refresh token
- POST /api/logout/         — blacklists refresh token {refresh: token}
- GET  /api/me/             — returns current user profile (auth required)

## Auth Flow
- JWT: access token 60min, refresh token 7 days, rotate on use
- Token blacklisting enabled via rest_framework_simplejwt.token_blacklist
- Passwords hashed via create_user, never stored plain, write_only in serializer
- Authorization header format: Bearer <access_token>

## Completed
- [x] Initialized git repo, README, pushed main to GitHub
- [x] Created dev branch
- [x] Created folder structure: backend/, frontend/, docs/
- [x] Created .gitignore, CLAUDE.md, .env with documented placeholders
- [x] Scaffolded React app with Vite inside frontend/
- [x] Vercel deployment live at wanas-delta.vercel.app
- [x] Scaffolded Django project with config/
- [x] Installed DRF, django-environ, psycopg2-binary, simplejwt, corsheaders
- [x] Configured settings.py with environ, DRF, JWT, CORS
- [x] Created users app: health_check, RegisterView, logout, me endpoints
- [x] Created UserProfile model with auto-create signals
- [x] Created quotes app: Quote and Mood models
- [x] Token blacklisting for proper logout
- [x] Tested all endpoints in Postman — working

## In Progress
- [ ] Connect React frontend to Django (register, login, me)
- [ ] PR: feature/auth-and-models into dev, then dev into main

## Backlog
- [ ] Install pgvector on Railway DB, replace embedding JSONField with vector field
- [ ] Build quote CRUD endpoints in Django
- [ ] Integrate sentence-transformers, write embedding pipeline
- [ ] Build mood matching endpoint (embed mood, pgvector similarity search)
- [ ] Deploy backend to Railway
- [ ] Django auth with SimpleJWT in React (store tokens, refresh, logout)
- [ ] UI design and styling
- [ ] User profile page
- [ ] Mood history
- [ ] Admin panel for adding quotes
- [ ] LinkedIn share button per quote
- [ ] Docs folder

## Key Decisions
- Railway over Supabase: Django needs its own backend
- pgvector over separate vector DB: keeps everything in one Railway PostgreSQL instance
- React on Vercel + Django on Railway: both free tiers are generous
- Docs live in /docs folder in repo
- Trello over ClickUp: simpler for solo project
- SECRET_KEY always in .env, never hardcoded
- SQLite locally, Railway PostgreSQL in production
- Vercel build uses cd frontend && npm run build because of monorepo structure
- Quote.embedding is JSONField now, will be replaced with pgvector field after Railway setup
- UserProfile auto-created via Django signals, not manually in RegisterView