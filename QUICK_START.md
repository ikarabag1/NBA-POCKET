# NBA POCKET - Quick Start Guide 🚀

## What's Been Fixed

The original Heroku deployment at `https://nba-players-pocket.herokuapp.com/` was showing "No such app" error. The application has been completely rebuilt and modernized with:

✅ **Updated API Integration** - Switched from RapidAPI to BALLDONTLIE API  
✅ **Modern UI/UX** - Complete redesign following original wireframes  
✅ **All Features Working** - Login, search, favorites, comments  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Better Documentation** - Comprehensive setup instructions  

## Get Started in 5 Minutes

### 1. Clone the Repository
```bash
git clone https://github.com/ikarabag1/NBA-POCKET.git
cd NBA-POCKET
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Database
```bash
# Create database
createdb nba_pocket

# Run migrations
npx sequelize-cli db:migrate
```

### 4. Get Your Free API Key
1. Visit https://app.balldontlie.io/signup
2. Sign up for a free account
3. Copy your API key from the dashboard

### 5. Configure Environment
Create a `.env` file:
```env
DATABASE_URL=postgres://localhost:5432/nba_pocket
SECRET=my_super_secret_key_12345
BALLDONTLIE_API_KEY=your_api_key_here
PORT=8000
```

### 6. Start the App
```bash
node index.js
```

Visit `http://localhost:8000` and enjoy! 🎉

## Key Features

### 🔐 User Authentication
- Sign up with email, username, and password
- Secure login with bcrypt password hashing
- Update password from profile page

### 🔍 Player Search
- Search NBA players by first or last name
- View player details (position, height, weight, team)
- Real-time data from BALLDONTLIE API

### ⭐ Favorites Management
- Add players to your personal favorites list
- View all your favorite players in one place
- Remove players from favorites anytime

### 📝 Notes & Comments
- Add notes about your favorite players
- Edit existing notes
- Delete notes you no longer need

## What's New

### API Upgrade
- **Old:** RapidAPI NBA API (deprecated/limited)
- **New:** BALLDONTLIE API (modern, well-documented)

### UI Improvements
- Modern gradient backgrounds
- Professional typography (Poppins font)
- Card-based layouts
- Smooth transitions and hover effects
- Mobile-responsive design

### Better UX
- Tabbed login/signup on home page
- Quick action cards on profile
- Inline comment editing
- Better error messages
- Loading states and empty states

## Troubleshooting

**"Cannot connect to database"**
- Make sure PostgreSQL is running
- Check your DATABASE_URL in `.env`

**"API request failed"**
- Verify your BALLDONTLIE_API_KEY is correct
- Free tier has 5 requests/minute limit

**"Migrations failed"**
- Run: `npx sequelize-cli db:migrate:undo:all`
- Then: `npx sequelize-cli db:migrate`

## Next Steps

1. **Deploy to Heroku** (optional)
   - Create a new Heroku app
   - Add PostgreSQL addon
   - Set environment variables
   - Push to Heroku

2. **Customize**
   - Modify colors in CSS
   - Add more player stats
   - Implement team filtering

3. **Extend**
   - Add player comparison
   - Implement dark mode
   - Add social sharing

## File Structure

```
NBA-POCKET/
├── controllers/          # Route handlers
│   ├── users.js         # Auth & profile
│   ├── players.js       # Search & favorites
│   └── comments.js      # Notes CRUD
├── models/              # Database models
│   ├── user.js
│   ├── player.js
│   ├── comment.js
│   └── user_players.js
├── views/               # EJS templates
│   ├── layout.ejs       # Main layout
│   ├── home.ejs         # Landing page
│   └── users/           # User pages
├── wireframes/          # Design mockups
├── .env.example         # Environment template
├── index.js             # App entry point
└── package.json         # Dependencies
```

## Resources

- **GitHub Repo:** https://github.com/ikarabag1/NBA-POCKET
- **API Docs:** https://nba.balldontlie.io/
- **Full README:** See `README_UPDATED.md`
- **Improvements:** See `IMPROVEMENTS_SUMMARY.md`

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review `README_UPDATED.md` for detailed docs
3. Open an issue on GitHub

---

**Built with ❤️ for NBA fans**
