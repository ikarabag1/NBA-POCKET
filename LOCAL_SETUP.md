# Local Development Setup - Troubleshooting Guide

**Error:** "Safari can't open the page because it couldn't connect to the server"

This guide will help you get NBA POCKET running on your local machine.

---

## Quick Checklist

Before diving into detailed steps, verify:

- [ ] Node.js is installed (`node --version`)
- [ ] PostgreSQL is installed and running
- [ ] Repository is cloned to your machine
- [ ] Dependencies are installed (`npm install`)
- [ ] Database is created
- [ ] `.env` file is configured
- [ ] Server is started (`node server.js`)

---

## Step-by-Step Setup

### Step 1: Install Prerequisites

#### Install Node.js

**Check if installed:**
```bash
node --version
npm --version
```

**If not installed:**
- Visit https://nodejs.org
- Download LTS version (recommended)
- Install and restart terminal

#### Install PostgreSQL

**macOS:**
```bash
# Using Homebrew
brew install postgresql@14
brew services start postgresql@14
```

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Run installer
- Remember the password you set for postgres user

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Verify PostgreSQL is running:**
```bash
# macOS/Linux
pg_isready

# Should output: /tmp:5432 - accepting connections

# Windows
# Check Services app for "postgresql" service
```

---

### Step 2: Clone the Repository

```bash
# Navigate to where you want the project
cd ~/Desktop  # or any folder you prefer

# Clone the repository
git clone https://github.com/ikarabag1/NBA-POCKET.git

# Enter the project directory
cd NBA-POCKET
```

---

### Step 3: Install Dependencies

```bash
# Make sure you're in the NBA-POCKET directory
npm install
```

**Expected output:**
```
added 150 packages in 15s
```

**If you see errors:**
- Make sure you have internet connection
- Try: `npm cache clean --force`
- Then: `npm install` again

---

### Step 4: Create Database

#### Option A: Command Line (macOS/Linux)

```bash
createdb nba_pocket
```

#### Option B: PostgreSQL Shell (All Platforms)

```bash
# Open PostgreSQL shell
psql postgres

# In psql prompt, run:
CREATE DATABASE nba_pocket;

# Exit psql
\q
```

#### Option C: Windows (pgAdmin)

1. Open pgAdmin
2. Right-click "Databases"
3. Select "Create" → "Database"
4. Name: `nba_pocket`
5. Click "Save"

**Verify database was created:**
```bash
psql -l | grep nba_pocket
```

---

### Step 5: Configure Environment Variables

#### Create .env file

```bash
# Copy the example file
cp .env.example .env

# Or create manually
touch .env
```

#### Edit .env file

Open `.env` in a text editor and add:

```env
# Database Configuration
# Format: postgres://username:password@host:port/database
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/nba_pocket

# Session Secret (generate a random string)
SECRET=your_super_secret_random_string_here_make_it_long

# NBA API Key
BALLDONTLIE_API_KEY=your_api_key_here

# Server Port
PORT=8000

# Environment
NODE_ENV=development
```

#### Get Your NBA API Key

1. Visit https://app.balldontlie.io/signup
2. Create free account
3. Copy your API key
4. Paste it in `.env` file

#### Database URL Configuration

**Default PostgreSQL credentials:**
- Username: `postgres`
- Password: (the one you set during installation)
- Host: `localhost`
- Port: `5432`
- Database: `nba_pocket`

**Example DATABASE_URL:**
```
postgres://postgres:mypassword@localhost:5432/nba_pocket
```

---

### Step 6: Run Database Migrations

```bash
npx sequelize-cli db:migrate
```

**Expected output:**
```
Sequelize CLI [Node: 14.x.x, CLI: 6.x.x, ORM: 6.x.x]

Loaded configuration file "config/config.json".
Using environment "development".
== 20220301234048-create-user: migrating =======
== 20220301234048-create-user: migrated (0.045s)
...
```

**If you see errors:**

**Error: "database does not exist"**
- Go back to Step 4 and create the database

**Error: "password authentication failed"**
- Check your DATABASE_URL in `.env`
- Verify PostgreSQL password is correct

**Error: "connect ECONNREFUSED"**
- PostgreSQL is not running
- Start it: `brew services start postgresql@14` (macOS)
- Or: `sudo systemctl start postgresql` (Linux)

---

### Step 7: Start the Server

```bash
node server.js
```

**Expected output:**
```
🚀 Server is running on port 8000
🗄️  Database connected successfully
```

**If you see:**
- ✅ "Server is running" → Success! Go to Step 8
- ❌ Error messages → See "Common Errors" section below

---

### Step 8: Access the Application

Open your browser and visit:

```
http://localhost:8000
```

**You should see:**
- NBA POCKET home page
- Animated basketball court background
- Login and Sign Up buttons

---

## Common Errors & Solutions

### Error: "Port 8000 is already in use"

**Solution 1: Kill the process using port 8000**
```bash
# macOS/Linux
lsof -i :8000
# Note the PID number
kill -9 <PID>

# Windows
netstat -ano | findstr :8000
# Note the PID number
taskkill /PID <PID> /F
```

**Solution 2: Use a different port**
```bash
# In .env file, change:
PORT=3000

# Then start server again
node server.js
```

---

### Error: "Cannot find module 'express'"

**Cause:** Dependencies not installed

**Solution:**
```bash
npm install
```

---

### Error: "database connection failed"

**Possible causes and solutions:**

**1. PostgreSQL not running**
```bash
# Check status
pg_isready

# Start PostgreSQL
# macOS:
brew services start postgresql@14

# Linux:
sudo systemctl start postgresql

# Windows:
# Open Services app and start "postgresql" service
```

**2. Wrong DATABASE_URL**
```bash
# Verify your .env file has correct format:
DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/nba_pocket

# Common mistakes:
# - Wrong password
# - Wrong username (default is usually "postgres")
# - Wrong port (default is 5432)
# - Database name typo
```

**3. Database doesn't exist**
```bash
# Create it
createdb nba_pocket
```

---

### Error: "Sequelize migration failed"

**Solution: Reset migrations**
```bash
# Undo all migrations
npx sequelize-cli db:migrate:undo:all

# Run migrations again
npx sequelize-cli db:migrate
```

---

### Error: "Cannot GET /"

**Cause:** Server is running but routes aren't configured

**Solution:**
```bash
# Make sure you're in the correct directory
pwd
# Should show: /path/to/NBA-POCKET

# Check if server.js exists
ls server.js

# Restart server
node server.js
```

---

### Error: "API rate limit exceeded"

**Cause:** Too many requests to BallDontLie API (5 per minute on free tier)

**Solution:**
- Wait 60 seconds
- Try search again
- Consider upgrading API plan for development

---

## Verify Everything is Working

### Test 1: Home Page
- Visit `http://localhost:8000`
- Should see NBA POCKET home page
- Check for animated basketball court background

### Test 2: Signup
- Click "Sign Up"
- Fill in username, email, password
- Click "Create Account"
- Should redirect to profile page

### Test 3: Login
- Click "Login"
- Enter username and password
- Should redirect to profile page

### Test 4: Search Players
- On profile page, search for "LeBron"
- Should see search results
- Try adding to favorites

### Test 5: Favorites
- Click "Favorites" in sidebar
- Should see your favorited players
- Try adding a comment

---

## Development Tips

### Auto-restart on file changes

Install nodemon:
```bash
npm install -g nodemon
```

Start server with nodemon:
```bash
nodemon server.js
```

Now the server will automatically restart when you edit files!

---

### View Database Contents

```bash
# Open PostgreSQL shell
psql nba_pocket

# View all users
SELECT * FROM users;

# View all players
SELECT * FROM players;

# View favorites
SELECT * FROM user_players;

# Exit
\q
```

---

### Clear Database and Start Fresh

```bash
# Undo all migrations
npx sequelize-cli db:migrate:undo:all

# Drop database
dropdb nba_pocket

# Create database again
createdb nba_pocket

# Run migrations
npx sequelize-cli db:migrate
```

---

## Still Having Issues?

### Check Your Setup

Run this diagnostic script:

```bash
# Check Node.js
echo "Node version:"
node --version

# Check npm
echo "npm version:"
npm --version

# Check PostgreSQL
echo "PostgreSQL status:"
pg_isready

# Check if database exists
echo "Database exists:"
psql -l | grep nba_pocket

# Check if dependencies are installed
echo "Dependencies:"
ls node_modules | wc -l
# Should show a number > 100

# Check if .env exists
echo ".env file:"
ls -la .env
```

---

### Get Help

If you're still stuck:

1. **Check the error message carefully**
   - Copy the full error text
   - Search for it online

2. **Review the README.md**
   - Troubleshooting section
   - Installation guide

3. **Check GitHub Issues**
   - https://github.com/ikarabag1/NBA-POCKET/issues
   - Someone may have had the same problem

4. **Create a new issue**
   - Include:
     - Operating system
     - Node.js version
     - PostgreSQL version
     - Full error message
     - Steps you've tried

---

## Quick Reference

### Start Development

```bash
# 1. Navigate to project
cd NBA-POCKET

# 2. Start PostgreSQL (if not running)
# macOS:
brew services start postgresql@14

# 3. Start server
node server.js

# 4. Open browser
# Visit: http://localhost:8000
```

### Stop Development

```bash
# 1. Stop server
# Press Ctrl+C in terminal

# 2. Stop PostgreSQL (optional)
# macOS:
brew services stop postgresql@14
```

---

## Environment Variables Reference

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | `postgres://postgres:pass@localhost:5432/nba_pocket` | PostgreSQL connection string |
| `SECRET` | Yes | `my_super_secret_key_12345` | Session encryption key |
| `BALLDONTLIE_API_KEY` | Yes | `abc123xyz` | NBA API key |
| `PORT` | No | `8000` | Server port (default: 8000) |
| `NODE_ENV` | No | `development` | Environment mode |

---

**Last Updated:** December 4, 2024

**Need more help?** Check the main README.md or open an issue on GitHub!
