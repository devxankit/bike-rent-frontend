# 🚀 Production Deployment Guide for React Frontend

## 1. Remove the Proxy Setting
- In `package.json`, remove or comment out the line:
  ```json
  "proxy": "http://localhost:5000",
  ```
- The proxy is only for local development. In production, your frontend must use the full backend URL.

---

## 2. Create a `.env` File for Production
- In your `frontend` directory, create a file named `.env` (do **not** commit this file to version control).
- Example content:
  ```env
  REACT_APP_API_URL=https://your-production-backend.com
  REACT_APP_ENV=production
  ```
- Set `REACT_APP_API_URL` to your actual backend URL.

---

## 3. Update API Calls to Use the Environment Variable
- In your React code, use the environment variable for all API calls:
  ```js
  const API_URL = process.env.REACT_APP_API_URL;
  const res = await fetch(`${API_URL}/api/auth/signup`, { ... });
  ```
- This ensures your app works with any backend URL, not just localhost.

---

## 4. Build and Deploy
- Run `npm run build` in your `frontend` directory.
- Deploy the contents of the `build/` folder to your production web server (e.g., Vercel, Netlify, AWS S3, etc.).

---

## 5. Example `.env` File
```env
# .env
REACT_APP_API_URL=https://your-production-backend.com
REACT_APP_ENV=production
```

---

## 6. Summary Table
| Step                | Development (Local)         | Production (Deployed)                |
|---------------------|----------------------------|--------------------------------------|
| Proxy               | Use `"proxy"` in package.json | Remove `"proxy"`                     |
| API URL             | Use relative paths (`/api/...`) | Use `REACT_APP_API_URL` in `.env`    |
| API Call Example    | `/api/auth/signup`          | `${process.env.REACT_APP_API_URL}/api/auth/signup` |
| .env File           | Not required                | Required, with backend URL           |

---

**Never commit your real `.env` file with secrets to version control. Always use environment variables for URLs and secrets in production.** 