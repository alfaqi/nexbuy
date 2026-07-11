## NexBuy - MERN Course Project

NexBuy is a simple marketplace (e-commerce) course project — no payments. It provides a clean UI with CRUD operations for users and products, backed by a Node/Express/MongoDB API and a React + Vite frontend.

### Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth
- Frontend: React (Vite), Zustand store, Radix/Ark-like UI primitives
- Testing: (folder scaffold present under `backend/tests/`)
- Deployment: Vercel configuration present for serverless deploy

---

## Getting Started

### Prerequisites
- Node.js LTS (v18+ recommended)
- npm 9+ (bundled with Node)
- MongoDB instance (local or hosted e.g. Atlas)

### Clone
```bash
git clone <your-repo-url> mern-course
cd mern-course
```

### Environment Variables
Create the following `.env` files.

Backend: `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_course
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

Frontend: `frontend/.env`
```env
VITE_API_BASE_URL=http://localhost:5000
```

> Adjust values for your environment (ports, URIs, secrets). When deploying, use production-ready values and secure secret storage.

### Install Dependencies
Run installs in both workspaces:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Run Locally
Open two terminals (or use a process manager):

Backend (Terminal 1):
```bash
cd backend
npm run dev
```
This starts the API server (default on `http://localhost:5000`).

Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```
This starts the React app (default on `http://localhost:5173`). The app expects the API base URL from `VITE_API_BASE_URL`.

---

## Scripts

Backend (`backend/package.json`):
- `npm run dev`: Start server in dev mode (nodemon)
- `npm start`: Start server

Frontend (`frontend/package.json`):
- `npm run dev`: Start Vite dev server
- `npm run build`: Production build
- `npm run preview`: Preview production build

---

## API Overview

Routes are organized under `backend/routes/` and controllers under `backend/controllers/`.
- Auth: `auth.route.js` (login/register)
- Users: `users.route.js` (CRUD, protected)
- Products: `products.route.js` (CRUD, protected)

Auth middleware: `backend/middleware/authMiddleware.js`
Models: `backend/model/user.model.js`, `backend/model/product.model.js`
DB config: `backend/config/db.js`

> Start the server and use a tool like Postman/Insomnia. Ensure `Authorization: Bearer <token>` for protected endpoints.

---

## Frontend Overview

Key paths under `frontend/src/`:
- `pages/` – Route pages (dashboard, auth, users, etc.)
- `components/` – UI components and modals
- `store/` – Zustand stores (`product.js`, `users.js`)
- `services/` – API services (`authService.js`)
- `hooks/` – Custom hooks (`useAuth.js`)
- `hoc/withAuth.jsx` – Route guard HOC

Update `VITE_API_BASE_URL` to point to your backend.

---

## Project Structure
```text
mern-course/
  backend/
    config/
    controllers/
    middleware/
    model/
    routes/
    server.js
    vercel.json
  frontend/
    public/
    src/
      components/
      pages/
      store/
      services/
      hooks/
      hoc/
    vite.config.js
    vercel.json
  readme.md
```

---

## Deployment

This repo contains Vercel configs (`backend/vercel.json`, `backend/vercel-serverless.js`, `frontend/vercel.json`). You can deploy frontend and backend as separate Vercel projects:
- Backend: Configure environment variables (e.g., `MONGO_URI`, `JWT_SECRET`) in Vercel project settings.
- Frontend: Set `VITE_API_BASE_URL` to your deployed backend URL.

Refer to Vercel docs for project linking and environment setup.

---

## Troubleshooting
- If frontend cannot reach API, verify `VITE_API_BASE_URL` and CORS.
- Ensure MongoDB is running and `MONGO_URI` is correct.
- On Windows PowerShell, use `"$env:VITE_API_BASE_URL='http://localhost:5000'"` for temporary env vars if needed.

---

## License
MIT (or your chosen license)
