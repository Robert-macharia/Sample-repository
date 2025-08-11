# Dementia Wellness App

A full-stack wellness assistant for dementia care with a Netflix-inspired UI theme. Includes activity tracking, food health analysis (AI), weather-based walking suggestions, SMS reminders, cognitive games, medication tracking, journaling (voice/text), family connection, and entertainment reminders.

## Stack
- Frontend: React (Vite), TypeScript, Tailwind CSS, Recharts
- Backend: Node.js, Express, TypeScript, in-memory storage with optional MongoDB
- AI: Gemini model (stubbed locally, pluggable with API key)
- Notifications: Twilio (stubbed without credentials)

## Monorepo Structure
- `backend/` Express API
- `frontend/` React app

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Backend
1. Copy `backend/.env.example` to `backend/.env` and fill values
2. Install deps and run
```
cd backend
npm install
npm run dev
```
Backend runs on http://localhost:4000

### Frontend
```
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173 (Vite)

## Environment Variables
See `backend/.env.example` for all supported values including Gemini, Twilio, and Weather API keys.

## Notes
- All external services have safe mock fallbacks for local development.
- RBAC supports `patient` and `caregiver` roles via JWT.
- Offline-ready PWA with an offline fallback UI.
