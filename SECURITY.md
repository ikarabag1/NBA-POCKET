# Security Policy

## 🔐 Protecting Your API Keys

**IMPORTANT:** Never commit API keys or sensitive credentials to your repository!

### What's Protected

✅ `.env` file is in `.gitignore` - your actual keys are safe
✅ `.env.example` contains only placeholder values
✅ All code uses `process.env` to read environment variables
✅ No hardcoded credentials in the codebase

### Environment Variables

This application requires the following environment variables:

| Variable | Purpose | Where to Get It |
|----------|---------|-----------------|
| `DATABASE_URL` | PostgreSQL connection string | Provided by hosting platform |
| `SECRET` | Session encryption key | Generate a random string |
| `BALLDONTLIE_API_KEY` | NBA data API access | https://app.balldontlie.io/signup |
| `NODE_ENV` | Environment mode | Set to `production` for deployment |
| `PORT` | Server port | Usually provided by hosting platform |

### Setting Up Environment Variables

#### Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual values in `.env`

3. **NEVER commit `.env` to git!**

#### Production (Render)

Environment variables are set through the Render dashboard:
- Go to your service settings
- Click "Environment"
- Add each variable with its actual value
- Render keeps these secure and encrypted

### Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Double-check before pushing

2. **Use strong secrets**
   - Generate random strings for `SECRET`
   - Use tools like https://randomkeygen.com/

3. **Rotate keys regularly**
   - Change API keys periodically
   - Update in hosting platform dashboard

4. **Limit API key permissions**
   - Use read-only keys when possible
   - Monitor API usage

5. **Keep dependencies updated**
   - Run `npm audit` regularly
   - Update packages with security fixes

### What to Do If Keys Are Exposed

If you accidentally commit API keys:

1. **Immediately revoke the exposed key**
   - Go to the API provider (BALLDONTLIE)
   - Generate a new key
   - Delete the old key

2. **Remove from git history**
   ```bash
   # Remove sensitive file from history
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch .env" \
   --prune-empty --tag-name-filter cat -- --all
   
   # Force push (be careful!)
   git push origin --force --all
   ```

3. **Update all deployments**
   - Update environment variables in Render
   - Redeploy with new keys

### Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email the repository owner directly
3. Provide details about the vulnerability
4. Allow time for a fix before public disclosure

### Additional Resources

- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

---

**Remember:** Security is everyone's responsibility. Keep your keys safe! 🔒
