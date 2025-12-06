# Vercel Deployment Guide

## Quick Deploy (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy from Project Root
```bash
cd d:\d-file\FSWD\ReactJS\LoginPage
vercel
```

Answer prompts:
- **Set up and deploy?** → `y`
- **Which scope?** → Choose your account
- **Linked to existing project?** → `n` (first time)
- **Project name** → `netflix-login` (or any name)
- **Directory to deploy** → `.` (current)
- **Want to modify settings** → `n`

### Step 3: Wait for Deployment
The CLI will build and deploy. You'll get a URL like:
```
https://netflix-login-xxxxxx.vercel.app
```

---

## Fix: Proper Configuration

Create `vercel.json` in root:
```json
{
  "buildCommand": "cd client && npm run build",
  "outputDirectory": "client/dist"
}
```

Create `client/.env.production`:
```
VITE_API_URL=https://netflix-login-xxxxxx.vercel.app
```

---

## Update Frontend for Vercel

Edit `client/src/Login.jsx` line 24:

**Change from:**
```javascript
const res = await fetch('http://localhost:4000/api/login', {
```

**Change to:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const res = await fetch(`${API_URL}/api/login`, {
```

---

## Deploy Backend (Render.com - Free)

1. Go to https://render.com
2. Click **New +** → **Web Service**
3. Connect GitHub repo
4. Settings:
   - **Name**: `netflix-api`
   - **Environment**: Node
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Click **Deploy**

Copy the URL from Render dashboard (e.g., `https://netflix-api-xxxxx.onrender.com`)

Update `client/.env.production`:
```
VITE_API_URL=https://netflix-api-xxxxx.onrender.com
```

Redeploy frontend:
```bash
vercel --prod
```

---

## Test Deployment

Open `https://netflix-login-xxxxxx.vercel.app` and try:
- Email: `user@example.com`
- Password: `password123`

Should work!

---

## Troubleshooting

**Still getting 404?**
1. Check Vercel build logs: Dashboard → Your Project → Deployments → Failed → Logs
2. Look for "outputDirectory not found" error
3. Run locally first: `cd client && npm run build`
4. Ensure `client/dist` folder exists with files

**CORS error in browser console?**
- Backend URL is wrong, or
- Backend not deployed yet

**Invalid credentials error?**
- Backend is working! Just wrong email/password
- Use: `user@example.com` / `password123`
