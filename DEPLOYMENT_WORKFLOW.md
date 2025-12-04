# Deployment Workflow

## Branch Strategy

This project uses a two-branch deployment strategy:

### **main** branch (Development)
- Used for active development
- All new features and fixes are committed here
- Not directly deployed to production
- Safe to experiment and test

### **deploy** branch (Production)
- Connected to Render for automatic deployment
- Only receives tested and approved code from main
- Represents the live production site
- Should always be stable

---

## How to Deploy Changes

### Step 1: Work on main branch
```bash
# Make sure you're on main
git checkout main

# Make your changes, then commit
git add .
git commit -m "Your commit message"
git push origin main
```

### Step 2: When ready to deploy
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

---

## Render Configuration

**Important:** Update Render settings to deploy from `deploy` branch:

1. Go to Render Dashboard: https://dashboard.render.com
2. Select your NBA-POCKET service
3. Go to **Settings** → **Build & Deploy**
4. Change **Branch** from `main` to `deploy`
5. Click **Save Changes**

---

## Quick Commands

### Deploy latest changes from main:
```bash
git checkout deploy && git merge main && git push origin deploy && git checkout main
```

### Check current branch:
```bash
git branch
```

### See differences between branches:
```bash
git diff main deploy
```

### View commit history:
```bash
git log --oneline --graph --all
```

---

## Benefits of This Workflow

✅ **Control**: Deploy only when ready, not on every commit  
✅ **Safety**: Test changes on main before deploying  
✅ **Rollback**: Easy to revert deploy branch if issues occur  
✅ **Clarity**: Clear separation between development and production  

---

## Emergency Rollback

If deployment causes issues:

```bash
# Switch to deploy branch
git checkout deploy

# Find the last working commit
git log --oneline

# Reset to that commit (replace COMMIT_HASH)
git reset --hard COMMIT_HASH

# Force push to trigger redeployment
git push --force origin deploy

# Switch back to main
git checkout main
```

---

## Current Status

- ✅ **main branch**: Active development branch
- ✅ **deploy branch**: Created and pushed to GitHub
- ⏳ **Render config**: Update to deploy from `deploy` branch (manual step required)

---

## Notes

- Always commit and push to **main** first
- Only merge to **deploy** when changes are tested
- Render will auto-deploy within 2-3 minutes after pushing to **deploy**
- Keep deploy branch clean - no direct commits, only merges from main
