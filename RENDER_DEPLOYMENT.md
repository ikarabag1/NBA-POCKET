# Deploy NBA POCKET to Render - Complete Guide

## Prerequisites

1. **GitHub Account** - Repository must be on GitHub
2. **Render Account** - Sign up at https://render.com (free)
3. **BALLDONTLIE API Key** - Get from https://app.balldontlie.io/signup (free)

## Method 1: Automatic Deployment (Easiest)

This method uses the `render.yaml` configuration file for automatic setup.

### Step 1: Prepare Your Repository

The repository already includes:
- ✅ `render.yaml` - Render configuration
- ✅ `build.sh` - Build script
- ✅ Updated `package.json` with start script

### Step 2: Deploy to Render

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Sign in or create an account

2. **Create New Blueprint**
   - Click "New +" button
   - Select "Blueprint"
   - Connect your GitHub account if not already connected
   - Select the `NBA-POCKET` repository
   - Click "Connect"

3. **Configure Blueprint**
   - Render will detect `render.yaml` automatically
   - Review the configuration:
     - **Web Service:** nba-pocket
     - **Database:** nba-pocket-db (PostgreSQL)
   - Click "Apply"

4. **Set Environment Variables**
   - In the web service settings, add:
     - `BALLDONTLIE_API_KEY`: Your API key
   - Other variables are auto-configured:
     - `DATABASE_URL`: Linked from database
     - `SECRET`: Auto-generated
     - `NODE_ENV`: production
     - `PORT`: 10000

5. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - Render will:
     - Create PostgreSQL database
     - Install npm packages
     - Run database migrations
     - Start the application

6. **Access Your App**
   - URL will be: `https://nba-pocket-xxxx.onrender.com`
   - Click the URL to open your app
   - First load may take 30-60 seconds (cold start)

## Method 2: Manual Deployment (Step-by-Step)

If you prefer manual control or automatic deployment doesn't work.

### Step 1: Create PostgreSQL Database

1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name:** `nba-pocket-db`
   - **Database:** `nba_pocket`
   - **User:** `nba_pocket_user`
   - **Region:** Choose closest to you
   - **Plan:** Free
4. Click "Create Database"
5. Wait for database to be ready (1-2 minutes)
6. Copy the **Internal Database URL** (starts with `postgresql://`)

### Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select `NBA-POCKET` repository
4. Configure:
   - **Name:** `nba-pocket`
   - **Region:** Same as database
   - **Branch:** `main`
   - **Runtime:** Node
   - **Build Command:** `npm install && npx sequelize-cli db:migrate`
   - **Start Command:** `node index.js`
   - **Plan:** Free

### Step 3: Add Environment Variables

In the "Environment" section, add:

| Key | Value | Notes |
|-----|-------|-------|
| `DATABASE_URL` | (Paste Internal Database URL) | From Step 1 |
| `SECRET` | (Generate random string) | Use https://randomkeygen.com/ |
| `BALLDONTLIE_API_KEY` | (Your API key) | From https://app.balldontlie.io |
| `NODE_ENV` | `production` | Required |
| `PORT` | `10000` | Default Render port |

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will start building
3. Monitor the logs for any errors
4. Wait for "Live" status (3-5 minutes)

### Step 5: Verify Deployment

1. Click the service URL
2. You should see the NBA POCKET home page
3. Test:
   - Sign up for an account
   - Login
   - Search for a player
   - Add to favorites
   - Add a comment

## Troubleshooting

### Build Fails

**Error: "Cannot find module 'sequelize'"**
- Solution: Check that `package.json` includes all dependencies
- Run: `npm install` locally to verify

**Error: "Migration failed"**
- Solution: Check DATABASE_URL is correct
- Verify database is running in Render dashboard

### App Won't Start

**Error: "Port already in use"**
- Solution: Ensure `PORT` environment variable is set to `10000`
- Check `index.js` uses `process.env.PORT`

**Error: "Cannot connect to database"**
- Solution: Use **Internal Database URL**, not External
- Verify DATABASE_URL format: `postgresql://user:pass@host/db`

### API Errors

**Error: "Failed to fetch player data"**
- Solution: Verify BALLDONTLIE_API_KEY is set correctly
- Test API key at https://nba.balldontlie.io/

**Error: "Too many requests"**
- Solution: Free tier has 5 requests/min limit
- Wait a minute and try again

### Cold Start Issues

**App takes 30-60 seconds to load**
- This is normal for Render free tier
- Service spins down after 15 minutes of inactivity
- Solution: Use UptimeRobot to keep it awake

## Free Tier Limitations

⚠️ **Be aware:**

- **Spin down:** Service sleeps after 15 minutes of inactivity
- **Cold start:** First request after sleep takes 30-60 seconds
- **Database:** 1GB storage limit
- **Runtime:** 750 hours/month (enough for 24/7 if kept awake)
- **Bandwidth:** 100GB/month

💡 **Keep your app awake:**
1. Sign up at https://uptimerobot.com (free)
2. Create new monitor
3. Set URL to your Render app
4. Set interval to 14 minutes
5. Your app will stay awake 24/7

## Updating Your Deployment

When you push changes to GitHub:

1. Render automatically detects the push
2. Starts a new build
3. Runs migrations if needed
4. Deploys the new version
5. Zero downtime deployment

**Manual redeploy:**
- Go to your service in Render dashboard
- Click "Manual Deploy" → "Deploy latest commit"

## Custom Domain (Optional)

To use your own domain:

1. Go to service settings
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

## Monitoring

**View Logs:**
- Go to service dashboard
- Click "Logs" tab
- Real-time logs of your application

**Metrics:**
- CPU usage
- Memory usage
- Request count
- Response times

## Cost Estimate

**Free Tier:**
- Web Service: $0/month
- PostgreSQL: $0/month
- Total: **$0/month**

**Paid Tier (if you upgrade):**
- Web Service: $7/month
- PostgreSQL: $7/month
- Total: $14/month
- Benefits: No spin down, more resources

## Support

**Render Documentation:**
- https://render.com/docs

**NBA POCKET Issues:**
- https://github.com/ikarabag1/NBA-POCKET/issues

**Render Community:**
- https://community.render.com/

---

**Your app is now live! Share it with friends and start tracking your favorite NBA players! 🏀**
