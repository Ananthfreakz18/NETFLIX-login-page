# Netflix-style Login (Demo)

This repo contains a demo that replicates a Netflix-style login flow using React for the frontend and Express for the backend.

Valid demo credentials:
- Email: `user@example.com`
- Password: `password123`

Quick start (on Windows PowerShell):

1. Install server dependencies and start server:

```powershell
cd server
npm install
npm start
```

2. In a separate terminal, start the client (Vite):

```powershell
cd client
npm install
npm run dev
```

3. Open `http://localhost:5173` (Vite default) and try signing in.

Notes:
- The client sends login requests to `http://localhost:4000/api/login`.
- No database is used — the server validates against static mock data in `server/auth.js`.
