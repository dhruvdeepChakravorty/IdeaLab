# IdeaLab

A full-stack AI-powered idea refinement platform. Capture your ideas, describe them in detail, and let AI surface strengths, weaknesses, next steps, and questions to consider.

**Live Demo:** https://idea-lab-rho.vercel.app

---

## Features

- **Authentication** — Register and log in with secure httpOnly cookie-based auth
- **Idea Management** — Create, view, and delete ideas
- **AI Refinement** — Describe your idea and get structured AI feedback powered by Gemini Flash
- **Version History** — Every refinement is saved as an immutable version, navigate back and forth
- **Dark / Light Mode** — Theme toggle with localStorage persistence

---

## Tech Stack

**Frontend**
- React 19 + TypeScript + Vite
- Tailwind CSS v4 + Shadcn UI
- React Router v6
- Axios + Zod + Sonner

**Backend**
- Express 5 + TypeScript
- MongoDB + Mongoose
- JWT + bcrypt
- Google Gemini Flash (`@google/genai`)

---

## Project Structure

```
IdeaLab/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── context/
│       ├── hooks/
│       └── types/
├── server/          # Express backend
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middleware/
│       ├── config/
│       └── types/
└── package.json     # Root with concurrently dev script
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/dhruvdeepChakravorty/IdeaLab.git
cd IdeaLab
```

2. Install all dependencies

```bash
npm install
cd client && npm install
cd ../server && npm install
```

3. Set up environment variables

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
PORT=3000
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

4. Run the development server

```bash
npm run dev
```

This starts both frontend (port 5173) and backend (port 3000) concurrently.

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/ideas` | Get all ideas |
| POST | `/api/ideas` | Create an idea |
| GET | `/api/ideas/:id` | Get idea by ID |
| DELETE | `/api/ideas/:id` | Delete an idea |
| GET | `/api/ideas/:ideaId/versions` | Get all versions for an idea |
| POST | `/api/ideas/:ideaId/versions` | Create a new version |
| GET | `/api/ideas/:ideaId/versions/latest` | Get latest version |

---

## Deployment

- **Frontend** — Vercel
- **Backend** — Render
- **Database** — MongoDB Atlas