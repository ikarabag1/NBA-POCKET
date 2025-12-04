# Fix Database Issue - Step by Step

**Problem:** Signup fails with "An error occurred during signup"**Cause:** Database `users` table doesn't exist**Solution:** Run migrations manually in Render Shell

---

## 🚀 Quick Fix (5 Minutes)

### Step 1: Open Render Dashboard

1. Go to [https://dashboard.render.com](https://dashboard.render.com)

1. Log in with your account

1. Click on **nba-pocket** service

### Step 2: Open Shell

1. Click the **"Shell"** tab in the left sidebar

1. Wait for the shell to connect (shows `$` prompt )

### Step 3: Run Migration

Copy and paste this command:

```bash
npx sequelize-cli db:migrate
```

Press Enter and wait. You should see:

```
== 20220301234048-create-user: migrating =======
== 20220301234048-create-user: migrated (0.123s)

== 20220301234049-create-player: migrating =======
== 20220301234049-create-player: migrated (0.089s)

== 20220301234050-create-favorite: migrating =======
== 20220301234050-create-favorite: migrated (0.067s)
```

### Step 4: Verify

Run this to check migration status:

```bash
npx sequelize-cli db:migrate:status
```

Should show:

```
up 20220301234048-create-user.js
up 20220301234049-create-player.js
up 20220301234050-create-favorite.js
```

### Step 5: Test Signup

1. Go to [https://nba-pocket.onrender.com/users/new](https://nba-pocket.onrender.com/users/new)

1. Fill in:
  - Username: yourusername
  - Email: [your@email.com](mailto:your@email.com)
  - Password: yourpassword

1. Click "Create Account"

1. Should redirect to profile page ✅

---

## 🔧 Alternative: Update render.yaml (Permanent Fix )

If you want migrations to run automatically on every deployment:

### Current render.yaml:

```yaml
services:
  - type: web
    name: nba-pocket
    runtime: node
    env: node
    plan: free
    buildCommand: npm install && chmod +x migrate.sh && ./migrate.sh
    startCommand: node index.js
```

### Updated render.yaml (Better):

```bash
services:
  - type: web
    name: nba-pocket
    runtime: node
    env: node
    plan: free
    buildCommand: npm install
    preDeployCommand: npx sequelize-cli db:migrate
    startCommand: node index.js
```

**The difference:**

- `preDeployCommand` runs AFTER build, BEFORE start

- More reliable than running in buildCommand

- Render's recommended approach

---

## 📋 Troubleshooting

### Error: "Unable to connect to database"

**Solution:** Check DATABASE_URL environment variable

```bash
echo $DATABASE_URL
```

Should show: `postgres://user:pass@host:5432/dbname`

If empty, add it in Render Dashboard → Environment

### Error: "Migrations table doesn't exist"

**Solution:** Initialize Sequelize

```bash
npx sequelize-cli db:migrate:status
```

This creates the migrations tracking table.

### Error: "relation already exists"

**Solution:** Migration already ran, skip it

```bash
npx sequelize-cli db:migrate:status
```

Check which migrations are "up" (already run).

---

## 🎯 What This Does

The migrations create these tables:

### 1. users table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

### 2. players table

```sql
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  position VARCHAR(50),
  height VARCHAR(20),
  weight VARCHAR(20),
  team VARCHAR(255),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

### 3. favorites table (join table)

```sql
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES users(id),
  playerId INTEGER REFERENCES players(id),
  notes TEXT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

---

## ✅ Success Checklist

After running migrations, verify:

- [ ] Can create new account

- [ ] Can login with username/password

- [ ] Can view profile page

- [ ] Can search for players

- [ ] Can add players to favorites

- [ ] Can view favorites page

- [ ] Can remove players from favorites

---

## 🆘 Still Not Working?

If signup still fails after running migrations:

1. **Check Render Logs**
  - Dashboard → Logs tab
  - Look for error messages
  - Share the error with support

1. **Verify Database Connection**

   ```bash
   node -e "const { Sequelize } = require('sequelize'); const sequelize = new Sequelize(process.env.DATABASE_URL); sequelize.authenticate().then(() => console.log('✅ Connected')).catch(err => console.error('❌ Error:', err));"
   ```

1. **Check Migration Files**

   ```bash
   ls -la migrations/
   ```

   Should show:
  - 20220301234048-create-user.js
  - 20220301234049-create-player.js
  - 20220301234050-create-favorite.js

---

## 📞 Need Help?

- **Render Docs:** [https://render.com/docs/databases#running-migrations](https://render.com/docs/databases#running-migrations)

- **Sequelize Docs:** [https://sequelize.org/docs/v6/other-topics/migrations/](https://sequelize.org/docs/v6/other-topics/migrations/)

- **GitHub Issues:** [https://github.com/ikarabag1/NBA-POCKET/issues](https://github.com/ikarabag1/NBA-POCKET/issues)

---

**Last Updated:** December 4, 2024**Status:** Awaiting manual migration

