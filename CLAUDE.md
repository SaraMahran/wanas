# Wanas ونس — Project Context for Claude

## What is Wanas
A personal quotes platform where users discover hand-picked quotes from real books, matched to their current mood through AI semantic search. Name means warmth, comfort, companionship in Arabic. Arabic-first, Egyptian dialect for UI text.

## Stack
- Frontend: React (Vite) on Vercel — wanas-delta.vercel.app
- Backend: Django + Django REST Framework on Railway
- Database: PostgreSQL + pgvector on Railway
- AI: sentence-transformers for mood-to-quote semantic matching
- Repo: GitHub monorepo, feature branch workflow

## Repo
- GitHub: https://github.com/SaraMahran/wanas
- Branching: main (protected, PRs only) → dev → feature/* fix/* chore/*
- Active branch: feature/react-django-connection

## Project Structure
```
wanas/
├── backend/
│   ├── venv/
│   ├── config/
│   │   ├── settings.py    # django-environ, DRF, JWT, CORS
│   │   ├── urls.py        # admin/, api/, api/token/, api/token/refresh/
│   │   └── wsgi.py
│   ├── users/
│   │   ├── models.py      # UserProfile, auto-create signals
│   │   ├── views.py       # health_check, RegisterView, logout, me
│   │   ├── urls.py        # health/, register/, logout/, me/
│   │   └── serializers.py # RegisterSerializer, UserProfileSerializer
│   ├── quotes/
│   │   └── models.py      # Quote (text, author, book, moods, embedding), Mood
│   ├── .env               # gitignored
│   ├── db.sqlite3         # local dev only, gitignored
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/    # Navbar.jsx + Navbar.css
│   │   │   ├── QuoteCard/ # QuoteCard.jsx + QuoteCard.css
│   │   │   └── MoodSelector/ # MoodSelector.jsx + MoodSelector.css
│   │   ├── pages/
│   │   │   ├── Home/      # Home.jsx + Home.css
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── AuthForm.css
│   │   ├── services/
│   │   │   ├── api.js     # axios instance, JWT interceptors, auto-refresh
│   │   │   └── auth.js    # register, login, logout, getMe, isLoggedIn
│   │   ├── App.jsx        # BrowserRouter, dark/light theme toggle
│   │   └── index.css      # CSS variables, body styles
│   ├── public/
│   │   └── logo.png       # Wanas logo, Artlist AI generated
│   └── .env               # VITE_API_URL, gitignored
├── docs/
├── .gitignore
├── CLAUDE.md
└── README.md
```

## Color Palette
```
--cream:      #FAF6F0   page background light
--ink:        #1A1410   page background dark
--warm-gold:  #E8A672   primary accent
--blush:      #FFAD8A   secondary accent
--rose:       #E88472   hover states
--mist:       #F5EDE3   card background light
--fog:        #2A201A   card background dark
--text-light: #3D2B1F   body text light mode
--text-dark:  #E8DDD4   body text dark mode
```

## Typography
- Display/quotes: Lora (serif, literary)
- Body/UI: Inter (clean, readable)
- Arabic: Amiri (for Arabic text)

## Logo
Artlist AI generated. Arabic calligraphy ونس with oval stroke, "Wanas" in English below, warm brown/gold on transparent background. Stored at frontend/public/logo.png.

## Environment Variables
backend/.env (never pushed):
- SECRET_KEY: placeholder locally, generate real at https://djecrety.ir for Railway
- DEBUG: True locally, False in production
- ALLOWED_HOSTS: localhost,127.0.0.1 locally, Railway domain in production
- DATABASE_URL: sqlite locally, Railway PostgreSQL URL in production
- CORS_ALLOWED_ORIGINS: http://localhost:5173 locally, Vercel URL in production

frontend/.env (never pushed):
- VITE_API_URL: http://127.0.0.1:8000 locally, Railway backend URL on Vercel

## Working API Endpoints
- GET  /api/health/         — server status, no auth
- POST /api/register/       — create user {username, email, password}
- POST /api/token/          — login, returns access + refresh JWT
- POST /api/token/refresh/  — refresh access token
- POST /api/logout/         — blacklist refresh token
- GET  /api/me/             — current user profile (auth required)

## Auth Flow
- JWT: access 60min, refresh 7 days, rotate on use
- Token blacklisting via rest_framework_simplejwt.token_blacklist
- Passwords hashed via create_user
- Authorization header: Bearer <access_token>
- Auto-refresh on 401 via axios interceptor in services/api.js

## UI Notes
- Arabic-first, Egyptian dialect: "حاسس بإيه دلوقت؟", "كمان واحدة", "حسب المود", "بندورلك...", "اكتشف ونس"
- Hero quote: ميلان كونديرا, tagline: "من مكتبتي، إليك"
- Quote card: diagonal gold color block design, decorative quotation marks
- Loading: open book SVG animation with floating Arabic words from quotes library (≤8 words)
- Moods in Arabic: متفائل, حزين شوية, هادي, متحمس, في تأمل, ممتنن
- Dark/light toggle in navbar
- Background: animated warm gold orbs (drift animation)

## Database Models
### users/models.py
- UserProfile: OneToOne with User, bio, avatar_url, created_at
- Signals: auto-create UserProfile on User save

### quotes/models.py
- Mood: name, emoji, description
- Quote: text, author, book, moods (M2M to Mood), embedding (VectorField 384d), added_by (FK to UserProfile), created_at

## Completed
- [x] Monorepo setup, GitHub, branching strategy
- [x] Django project with DRF, JWT auth, CORS
- [x] UserProfile, Quote, Mood models
- [x] Token blacklisting for proper logout
- [x] React + Vite frontend
- [x] Vercel deployment (wanas-delta.vercel.app)
- [x] Axios services with JWT interceptors
- [x] Railway PostgreSQL + pgvector enabled
- [x] Migrations run against Railway DB
- [x] Homepage UI: hero, loading animation, quote card, mood selector
- [x] Auth forms: login, register
- [x] Dark/light mode toggle
- [x] All UI text in Egyptian Arabic

## In Progress
- [ ] PR: feature/react-django-connection into dev, then dev into main

## Backlog
- [ ] Enable Django admin for quotes
- [ ] Add real quotes to DB via Django admin
- [ ] Build quote list/detail API endpoints
- [ ] Wire homepage to real quote API
- [ ] sentence-transformers embedding pipeline
- [ ] Mood matching endpoint with pgvector similarity search
- [ ] Deploy backend to Railway
- [ ] User profile page
- [ ] Mood history
- [ ] LinkedIn share button per quote
- [ ] Docs folder

## Key Decisions
- Railway over Supabase: Django needs its own backend
- pgvector over separate vector DB: one Railway PostgreSQL instance
- React on Vercel + Django on Railway: both generous free tiers
- Docs in /docs folder in repo
- Trello for task management (solo project)
- SECRET_KEY always in .env, never hardcoded
- SQLite locally, Railway PostgreSQL in production
- Egyptian Arabic dialect for all UI text
- Django admin for initial quote entry (no custom admin UI needed yet)
- PLACEHOLDER_QUOTES in Home.jsx replaced with real API after quote endpoints built
- Short quotes (≤8 words) auto-filtered for loading animation floating words