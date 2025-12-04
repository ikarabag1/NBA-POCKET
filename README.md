# NBA POCKET 🏀

**Track your favorite NBA players with style**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://nba-pocket.onrender.com)
[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/ikarabag1/NBA-POCKET)

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Design](#-design)
4. [Quick Start](#-quick-start)
5. [Installation Guide](#-installation-guide)
6. [Deployment Workflow](#-deployment-workflow)
7. [Authentication System](#-authentication-system)
8. [Database Schema](#-database-schema)
9. [API Routes](#-api-routes)
10. [Technologies](#-technologies)
11. [Troubleshooting](#-troubleshooting)
12. [Security](#-security)

---

## 🎯 Overview

NBA POCKET is a full-stack web application that allows basketball fans to search for NBA players, save their favorites, and add personal notes. Built with a premium black/white/silver/gold design theme featuring smooth animations and a dynamic basketball court background.

**Live Site:** [https://nba-pocket.onrender.com](https://nba-pocket.onrender.com)

### What You Can Do

- 🔍 **Search** for any NBA player by name
- ⭐ **Favorite** players to track them
- 📝 **Add notes** and comments about your favorite players
- 🎨 **Enjoy** a premium, animated user interface
- 🔐 **Secure** authentication with encrypted passwords

---

## ✨ Features

### Completed Features ✅

#### 1. **Authentication System**
- Signup with username, email, and password
- Login with username and password
- Secure session management with encrypted cookies
- Password hashing with bcrypt
- Premium styled forms with animations

#### 2. **Home Page**
- Modern landing page with hero section
- Navigation bar with Login/Sign Up buttons
- Animated basketball court background
- Floating gold particles effect
- Responsive design for all devices

#### 3. **Profile Page (Dashboard)**
- Player search functionality
- Real-time search results
- Add players to favorites
- Sidebar navigation
- Welcome message with username

#### 4. **Favorites Page**
- View all favorited players
- Player cards with team information
- Remove players from favorites
- Comments section for each player
- Add, edit, and delete notes

#### 5. **Database & API**
- PostgreSQL database integration
- BallDontLie NBA API for player data
- Proper table relationships
- Error handling

---

## 🎨 Design

### Color Scheme

**Premium Black/White/Silver/Gold Theme**

| Color | Hex Code | Usage |
|-------|----------|-------|
| Black | `#0a0a0a`, `#1a1a1a` | Primary background |
| Gold | `#FFD700`, `#FFA500` | Accent colors, buttons |
| Silver | `#C0C0C0` | Secondary text, borders |
| White | `#ffffff` | Primary text |

### Visual Features

- ✨ Animated basketball court background with zoom effect
- 🌟 Floating gold particles
- 🎭 Smooth page transitions
- 💫 Micro-animations on hover
- 🖼️ Modern glassmorphism effects
- 📱 Fully responsive design

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Git
- A code editor (VS Code recommended)

### 5-Minute Setup

```bash
# 1. Clone the repository
git clone https://github.com/ikarabag1/NBA-POCKET.git
cd NBA-POCKET

# 2. Install dependencies
npm install

# 3. Create database
createdb nba_pocket

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 5. Run migrations
npx sequelize-cli db:migrate

# 6. Start the application
node server.js
```

Visit `http://localhost:8000` in your browser!

---

## 📦 Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/ikarabag1/NBA-POCKET.git
cd NBA-POCKET
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages:
- Express.js (web framework)
- Sequelize (ORM)
- bcrypt (password hashing)
- EJS (templating)
- And more...

### Step 3: Database Setup

#### Option A: Using Command Line

```bash
# Create the database
createdb nba_pocket
```

#### Option B: Using PostgreSQL Shell

```sql
-- Open psql
psql postgres

-- Create database
CREATE DATABASE nba_pocket;

-- Exit psql
\q
```

#### Run Migrations

```bash
npx sequelize-cli db:migrate
```

This creates all necessary tables:
- users
- players
- user_players (join table)
- comments

### Step 4: Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgres://username:password@localhost:5432/nba_pocket

# Session Secret (use a strong random string)
SECRET=your_secret_key_here_make_it_long_and_random

# NBA API Key (get from https://app.balldontlie.io/signup)
BALLDONTLIE_API_KEY=your_api_key_here

# Server Port
PORT=8000

# Environment
NODE_ENV=development
```

#### Get Your NBA API Key

1. Visit [BALLDONTLIE API](https://app.balldontlie.io/signup)
2. Create a free account
3. Copy your API key
4. Add it to your `.env` file

**Free Tier Limits:** 5 requests per minute

### Step 5: Start the Application

```bash
# Development mode
node server.js

# Or with nodemon (auto-restart on changes)
npm install -g nodemon
nodemon server.js
```

The app will be running at **http://localhost:8000**

---

## 🔄 Deployment Workflow

This project uses a **two-branch strategy** for controlled deployments:

### Branch Structure

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| **main** | Development & testing | Not deployed |
| **deploy** | Production-ready code | Render (live site) |

### How It Works

```
main branch (development)
    ↓
  merge when ready
    ↓
deploy branch (production)
    ↓
  auto-deploy to Render
    ↓
Live Site 🚀
```

### Step-by-Step Deployment

#### Step 1: Work on Main Branch

```bash
# Ensure you're on main
git checkout main

# Make your changes
# ... edit files ...

# Commit changes
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin main
```

#### Step 2: Deploy to Production

When your changes are tested and ready:

```bash
# Switch to deploy branch
git checkout deploy

# Merge all new commits from main
git merge main

# Push to GitHub (triggers Render deployment)
git push origin deploy

# Switch back to main for continued development
git checkout main
```

#### Quick Deploy Command

```bash
git checkout deploy && git merge main && git push origin deploy && git checkout main
```

### Configure Render

**One-time setup:**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your **NBA-POCKET** service
3. Navigate to **Settings** → **Build & Deploy**
4. Change **Branch** from `main` to `deploy`
5. Click **Save Changes**

Now Render will only deploy when you push to the `deploy` branch!

### Emergency Rollback

If a deployment causes issues:

```bash
# Switch to deploy branch
git checkout deploy

# View commit history
git log --oneline

# Reset to last working commit
git reset --hard <COMMIT_HASH>

# Force push to trigger redeployment
git push --force origin deploy

# Switch back to main
git checkout main
```

### Benefits

✅ **Control** - Deploy only when ready  
✅ **Safety** - Test on main before deploying  
✅ **Rollback** - Easy to revert if needed  
✅ **Clarity** - Clear dev/prod separation  

---

## 🔐 Authentication System

### How Authentication Works

#### Signup Flow

```
1. User visits /users/new
   ↓
2. Fills form: Username, Email, Password
   ↓
3. System checks if username is unique
   ↓
4. Password is hashed with bcrypt (10 rounds)
   ↓
5. User record created in database
   ↓
6. Session cookie set (encrypted with AES)
   ↓
7. Redirect to /users/profile
```

#### Login Flow

```
1. User visits /users/login
   ↓
2. Enters: Username, Password
   ↓
3. System finds user by username
   ↓
4. Password verified with bcrypt.compare()
   ↓
5. If valid: Session cookie set
   ↓
6. Redirect to /users/profile
```

#### Logout Flow

```
1. User clicks Logout button
   ↓
2. Session cookie cleared
   ↓
3. Redirect to home page
```

### Security Features

- 🔒 **Password Hashing** - bcrypt with 10 salt rounds
- 🔐 **Session Encryption** - AES encryption for user IDs
- 🍪 **HTTP-only Cookies** - Prevents XSS attacks
- ✅ **Input Validation** - Required fields checked
- 🛡️ **SQL Injection Prevention** - Sequelize ORM parameterization

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Users     │         │  User_Players    │         │   Players   │
├─────────────┤         │  (Join Table)    │         ├─────────────┤
│ id (PK)     │────────<│ userId (FK)      │>────────│ id (PK)     │
│ username    │         │ playerId (FK)    │         │ name        │
│ email       │         │ createdAt        │         │ team        │
│ password    │         │ updatedAt        │         │ position    │
│ createdAt   │         └──────────────────┘         │ api_id      │
│ updatedAt   │                                      │ createdAt   │
└─────────────┘                                      │ updatedAt   │
       │                                             └─────────────┘
       │                                                    │
       │         ┌──────────────────┐                      │
       │         │    Comments      │                      │
       │         ├──────────────────┤                      │
       └────────<│ userId (FK)      │                      │
                 │ playerId (FK)    │>─────────────────────┘
                 │ content          │
                 │ createdAt        │
                 │ updatedAt        │
                 └──────────────────┘
```

### Table Definitions

#### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique user ID |
| username | VARCHAR(255) | UNIQUE, NOT NULL | Login username |
| email | VARCHAR(255) | NOT NULL | User email |
| password | VARCHAR(255) | NOT NULL | Hashed password |
| createdAt | TIMESTAMP | NOT NULL | Account creation date |
| updatedAt | TIMESTAMP | NOT NULL | Last update date |

#### Players Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique player ID |
| name | VARCHAR(255) | NOT NULL | Player full name |
| team | VARCHAR(255) | | Team name |
| position | VARCHAR(50) | | Player position |
| api_id | INTEGER | UNIQUE | BallDontLie API ID |
| createdAt | TIMESTAMP | NOT NULL | Record creation date |
| updatedAt | TIMESTAMP | NOT NULL | Last update date |

#### User_Players Table (Join Table)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique record ID |
| userId | INTEGER | FOREIGN KEY → users.id | User reference |
| playerId | INTEGER | FOREIGN KEY → players.id | Player reference |
| createdAt | TIMESTAMP | NOT NULL | Favorite added date |
| updatedAt | TIMESTAMP | NOT NULL | Last update date |

#### Comments Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique comment ID |
| userId | INTEGER | FOREIGN KEY → users.id | User who wrote comment |
| playerId | INTEGER | FOREIGN KEY → players.id | Player being commented on |
| content | TEXT | NOT NULL | Comment text |
| createdAt | TIMESTAMP | NOT NULL | Comment creation date |
| updatedAt | TIMESTAMP | NOT NULL | Last edit date |

---

## 🛣️ API Routes

### Authentication Routes

| Method | Path | Purpose | Auth Required |
|--------|------|---------|---------------|
| GET | `/users/new` | Signup form | No |
| POST | `/users` | Create new user | No |
| GET | `/users/login` | Login form | No |
| POST | `/users/login` | Authenticate user | No |
| GET | `/users/logout` | Logout user | Yes |
| GET | `/users/profile` | User dashboard | Yes |
| PUT | `/users/profile` | Update password | Yes |

### Player Routes

| Method | Path | Purpose | Auth Required |
|--------|------|---------|---------------|
| GET | `/players/search` | Search form | Yes |
| POST | `/players/search` | Search API | Yes |
| GET | `/players/results` | Display results | Yes |
| POST | `/players/favorites` | Add to favorites | Yes |
| GET | `/players/favorites` | View favorites | Yes |
| DELETE | `/players/favorites/:id` | Remove favorite | Yes |

### Comment Routes

| Method | Path | Purpose | Auth Required |
|--------|------|---------|---------------|
| POST | `/comments/favorites` | Add comment | Yes |
| PUT | `/comments/favorites/:id` | Edit comment | Yes |
| DELETE | `/comments/favorites/:id` | Delete comment | Yes |

---

## 🛠️ Technologies

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 14+ | JavaScript runtime |
| **Express.js** | 4.x | Web framework |
| **PostgreSQL** | 12+ | Database |
| **Sequelize** | 6.x | ORM |
| **bcrypt** | 5.x | Password hashing |
| **crypto-js** | 4.x | Session encryption |
| **axios** | 1.x | HTTP client |
| **cookie-parser** | 1.x | Cookie handling |

### Frontend

| Technology | Purpose |
|------------|---------|
| **EJS** | Templating engine |
| **CSS3** | Styling & animations |
| **JavaScript** | Client-side interactivity |

### External APIs

| API | Purpose | Limits |
|-----|---------|--------|
| **BallDontLie API** | NBA player data | 5 req/min (free) |

### Deployment

| Platform | Service |
|----------|---------|
| **Render** | Web hosting + PostgreSQL |
| **GitHub** | Version control |

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. Database Connection Errors

**Error:** `ECONNREFUSED` or `database does not exist`

**Solutions:**

```bash
# Check if PostgreSQL is running
pg_isready

# If not running, start it
# macOS:
brew services start postgresql

# Linux:
sudo service postgresql start

# Windows:
# Start PostgreSQL service from Services app

# Verify database exists
psql -l | grep nba_pocket

# If not exists, create it
createdb nba_pocket
```

#### 2. Migration Errors

**Error:** `SequelizeDatabaseError` during migration

**Solutions:**

```bash
# Reset all migrations
npx sequelize-cli db:migrate:undo:all

# Run migrations again
npx sequelize-cli db:migrate

# If still failing, check config/config.json
# Ensure database credentials are correct
```

#### 3. API Rate Limit Errors

**Error:** `429 Too Many Requests`

**Solution:**
- Free tier limit: 5 requests/minute
- Wait 60 seconds before trying again
- Consider upgrading API plan for higher limits

#### 4. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::8000`

**Solutions:**

```bash
# Find process using port 8000
# macOS/Linux:
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=3000
```

#### 5. Session/Login Issues

**Problem:** Can't log in or session expires immediately

**Solutions:**

1. Check `.env` file has `SECRET` set
2. Clear browser cookies
3. Verify database has user record:
   ```sql
   psql nba_pocket
   SELECT * FROM users;
   ```

#### 6. Render Deployment Issues

**Problem:** Site shows 502 Bad Gateway

**Solutions:**

1. Check Render logs for errors
2. Verify environment variables are set
3. Ensure `DATABASE_URL` is correct
4. Check if migrations ran successfully
5. Verify build command completed

**Problem:** Site is slow to load

**Solution:**
- Free tier spins down after 15 minutes
- First request takes 30-60 seconds to wake up
- Use [UptimeRobot](https://uptimerobot.com/) to ping every 14 minutes

---

## 🔒 Security

### Best Practices Implemented

✅ **Never commit `.env` files** - Already in `.gitignore`  
✅ **Use strong passwords** - Minimum 6 characters enforced  
✅ **Hash passwords** - bcrypt with 10 salt rounds  
✅ **Encrypt sessions** - AES encryption for cookies  
✅ **Validate input** - Required fields checked server-side  
✅ **Prevent SQL injection** - Sequelize parameterized queries  
✅ **HTTPS in production** - Render provides SSL certificates  

### Security Checklist

Before deploying:

- [ ] All API keys in environment variables
- [ ] `.env` file not committed to Git
- [ ] Strong `SECRET` value set (32+ characters)
- [ ] Database uses strong password
- [ ] HTTPS enabled (automatic on Render)
- [ ] Input validation on all forms
- [ ] Error messages don't expose sensitive info

### Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public GitHub issue
2. Email the repository owner directly
3. Include detailed description and steps to reproduce
4. Allow 48 hours for initial response

---

## 📝 License

ISC License - See LICENSE file for details

---

## 👨‍💻 Author

**ikarabag1**
- GitHub: [@ikarabag1](https://github.com/ikarabag1)
- Repository: [NBA-POCKET](https://github.com/ikarabag1/NBA-POCKET)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

### Step 1: Fork & Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/NBA-POCKET.git
cd NBA-POCKET
```

### Step 2: Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### Step 3: Make Changes

- Follow existing code style
- Add comments for complex logic
- Test your changes locally

### Step 4: Commit & Push

```bash
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

### Step 5: Open Pull Request

- Go to GitHub
- Click "New Pull Request"
- Describe your changes
- Wait for review

---

## 🎯 Roadmap

### Current Status ✅

- ✅ User authentication
- ✅ Player search
- ✅ Favorites management
- ✅ Comments system
- ✅ Premium UI design
- ✅ Deployment workflow

### Planned Features 🔄

- [ ] Player statistics and career info
- [ ] Team filtering and sorting
- [ ] Player comparison feature
- [ ] Dark mode toggle
- [ ] Mobile app (React Native)
- [ ] Social features (share favorites)
- [ ] Notifications for player updates

---

## 📸 Screenshots

### Home Page
![Home Page](wireframes/index.jpg)

### Profile Page
![Profile Page](wireframes/Profile.jpg)

### Favorites Page
![Favorites Page](wireframes/favorites.jpg)

### ERD
![Entity Relationship Diagram](wireframes/ERD.png)

---

## 🙏 Acknowledgments

- **BallDontLie API** for providing free NBA data
- **Render** for free hosting
- **NBA** for the amazing sport and players
- **Open source community** for the tools and libraries

---

## 📞 Support

Need help? Here's how to get support:

1. **Check Documentation** - Read this README thoroughly
2. **Search Issues** - Check [GitHub Issues](https://github.com/ikarabag1/NBA-POCKET/issues)
3. **Open New Issue** - If problem persists, create a new issue with:
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, etc.)

---

**Enjoy tracking your favorite NBA players! 🏀⭐**

*Last Updated: December 4, 2024*
