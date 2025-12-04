# Fixing Render Deployment Error

## Current Issue

Your deployment is failing with **"Exited with status 1"**. This is usually caused by missing environment variables or database connection issues.

## 🔧 Quick Fix Steps

### Step 1: Add Environment Variables

In your Render dashboard for `NBA-POCKET-1`:

1. Click on your service name
2. Go to **"Environment"** tab on the left sidebar
3. Add these environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `BALLDONTLIE_API_KEY` | Your API key | Get from https://app.balldontlie.io/signup |
| `SECRET` | Any random string | Example: `my_super_secret_key_12345` |
| `NODE_ENV` | `production` | Required for production |
| `PORT` | `10000` | Render's default port |

**Important:** `DATABASE_URL` should already be set automatically if you created the database through the Blueprint.

### Step 2: Verify Database Connection

1. In Render dashboard, go to **"Databases"** (left sidebar)
2. You should see `nba-pocket-db` or similar
3. Click on it and verify it's **"Available"** (green status)
4. Copy the **Internal Database URL**
5. Go back to your web service
6. In Environment tab, verify `DATABASE_URL` is set to this Internal URL

### Step 3: Manual Redeploy

After adding environment variables:

1. Go to your service dashboard
2. Click **"Manual Deploy"** dropdown
3. Select **"Deploy latest commit"**
4. Wait 3-5 minutes for deployment

### Step 4: Check Build Logs

While deploying, watch the logs:

1. Look for any errors in red
2. Common errors:
   - `SECRET is not defined` → Add SECRET env variable
   - `Cannot connect to database` → Check DATABASE_URL
   - `BALLDONTLIE_API_KEY is not defined` → Add API key

## 📋 Environment Variables Checklist

Make sure ALL of these are set:

- [ ] `BALLDONTLIE_API_KEY` - Your NBA API key
- [ ] `SECRET` - Random string for session encryption
- [ ] `DATABASE_URL` - PostgreSQL connection string (auto-set by Render)
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Set to `10000` (or leave empty, Render sets it)

## 🐛 Common Issues

### Issue 1: "SECRET is not defined"
**Solution:** Add `SECRET` environment variable with any random string

### Issue 2: "Cannot connect to database"
**Solution:** 
- Verify database is created and running
- Use **Internal Database URL**, not External
- Format: `postgresql://user:password@host/database`

### Issue 3: "Module not found"
**Solution:** 
- Check `package.json` has all dependencies
- Build command should be: `npm install && npx sequelize-cli db:migrate`

### Issue 4: "Port already in use"
**Solution:** 
- Make sure `index.js` uses `process.env.PORT`
- Line 56 should be: `const PORT = process.env.PORT || 8000`

## 🎯 Expected Successful Deployment

When successful, you should see:

```
==> Installing dependencies
==> Running build command: npm install && npx sequelize-cli db:migrate
==> Sequelize CLI [Node: 18.x.x, CLI: 6.x.x, ORM: 6.x.x]
==> Successfully created migrations
==> Starting service with: node index.js
==> Auth app running on 10000
==> Your service is live 🎉
```

## 📞 Still Having Issues?

If deployment still fails after these steps:

1. **Check the full logs:**
   - Click on "Logs" in your service dashboard
   - Look for the specific error message
   - Search for keywords like "Error:", "Failed", "Cannot"

2. **Common log errors and fixes:**

   **Error: `Cannot find module 'sequelize'`**
   - Fix: Check `package.json` includes sequelize
   - Redeploy after verifying

   **Error: `Database connection refused`**
   - Fix: Verify database is running
   - Check DATABASE_URL format

   **Error: `EADDRINUSE: address already in use`**
   - Fix: Restart the service
   - Click "Manual Deploy" → "Clear build cache & deploy"

3. **Try these debug steps:**
   ```bash
   # In your local terminal, test the app:
   cd NBA-POCKET
   npm install
   createdb nba_pocket
   npx sequelize-cli db:migrate
   node index.js
   ```
   
   If it works locally but not on Render, it's an environment issue.

## 🔄 Alternative: Start Fresh

If nothing works, delete and recreate:

1. Delete the current web service (keep the database)
2. Go to "New +" → "Web Service"
3. Select your repository
4. Use these settings:
   - **Build Command:** `npm install && npx sequelize-cli db:migrate`
   - **Start Command:** `node index.js`
   - **Environment:** Node
5. Add all environment variables BEFORE clicking "Create Web Service"

## ✅ Verification

Once deployed successfully:

1. Visit your URL: `https://nba-pocket-1.onrender.com`
2. You should see the home page
3. Try signing up for an account
4. Test the player search feature

---

**Need more help?** Check the Render docs: https://render.com/docs/troubleshooting-deploys
