# PA FABS ERP — Frontend

Single-page ERP UI (static HTML + vanilla JS). Deployed on Vercel.

## Config
`config.js` sets the backend API base URL:
```js
window.API_CONFIG = { BASE: "https://<backend>.onrender.com/api" };
```
The app reads `window.API_CONFIG.BASE` and falls back to `http://localhost:3001/api`
for local dev.

## Run locally
```bash
python3 -m http.server 3000
# open http://localhost:3000
```
Run the backend on :3001 (see the backend repo) or point `config.js` at a deployed backend.

Default logins: `admin`/`admin123`, `user`/`user123`.

## Deploy (Vercel)
Static site, no build step. `vercel --prod` or import the repo in the Vercel dashboard.
After deploy, make sure the backend's `ALLOWED_ORIGINS` includes this site's URL.
