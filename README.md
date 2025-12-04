# NBA POCKET 🏀

Now NBA players info are in your pocket to track and to favorite the players you pick.

## 🚀 INSTALL INSTRUCTIONS

1. **Fork and clone the repo**
   ```bash
   git clone https://github.com/ikarabag1/NBA-POCKET.git
   cd NBA-POCKET
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Create the database
   createdb nba_pocket
   # OR using SQL
   # create database nba_pocket;
   
   # Run migrations
   sequelize db:migrate
   ```

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Add your API key and other configuration:
   
   ```env
   # Database Configuration
   DATABASE_URL=postgres://username:password@localhost:5432/nba_pocket
   
   # Session Secret (use a strong random string)
   SECRET=your_secret_key_here
   
   # NBA API Key - Get from https://app.balldontlie.io/signup
   BALLDONTLIE_API_KEY=your_api_key_here
   
   # Server Port
   PORT=8000
   ```

5. **Get your NBA API Key**
   - Visit [BALLDONTLIE API](https://app.balldontlie.io/signup)
   - Create a free account
   - Copy your API key and add it to your `.env` file

6. **Start the application**
   ```bash
   node index.js
   ```
   
   The app will be running at `http://localhost:8000`

## 🛠️ TECHNOLOGIES USED

- **Frontend:** HTML5, CSS3, JavaScript, EJS Templates
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Sequelize ORM
- **API:** BALLDONTLIE NBA API (upgraded from RapidAPI)
- **Authentication:** bcrypt, crypto-js, cookie-parser
- **Styling:** Custom CSS with responsive design

## 👤 USER STORIES

- I would like to search NBA Players by their name and get info on NBA players
- I would like to create favorite NBA players and keep track of their info, and delete when I want to
- I would like to add notes in the comments section of favorites list and be able to update and remove them

## 🌐 DEPLOYMENT

**GitHub Repository:** https://github.com/ikarabag1/NBA-POCKET

**Status:** Ready for deployment

### 🚀 Deploy to Render (Recommended - Free Tier)

Render provides free hosting for web services and PostgreSQL databases, perfect for this application.

#### Quick Deploy (Automatic)

1. **Fork this repository** to your GitHub account

2. **Sign up for Render** at https://render.com

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select the `NBA-POCKET` repository
   - Render will automatically detect the `render.yaml` configuration

4. **Configure Environment Variables**
   - `BALLDONTLIE_API_KEY`: Your API key from https://app.balldontlie.io/signup
   - `SECRET`: Will be auto-generated (or set your own)
   - `DATABASE_URL`: Will be auto-configured from the database

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically:
     - Create a PostgreSQL database
     - Install dependencies
     - Run migrations
     - Start the application

6. **Access Your App**
   - Your app will be live at: `https://nba-pocket-xxxx.onrender.com`
   - First request may take 30-60 seconds (free tier cold start)

#### Manual Deploy (Step-by-Step)

1. **Create PostgreSQL Database**
   - Go to Render Dashboard
   - Click "New +" → "PostgreSQL"
   - Name: `nba-pocket-db`
   - Plan: Free
   - Click "Create Database"
   - Copy the **Internal Database URL**

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `nba-pocket`
     - **Environment:** Node
     - **Build Command:** `npm install && npx sequelize-cli db:migrate`
     - **Start Command:** `node index.js`

3. **Add Environment Variables**
   - `DATABASE_URL`: Paste the Internal Database URL
   - `SECRET`: Generate a random string (e.g., use https://randomkeygen.com/)
   - `BALLDONTLIE_API_KEY`: Your NBA API key
   - `NODE_ENV`: `production`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)

#### Important Notes for Render Free Tier

⚠️ **Free tier limitations:**
- Services spin down after 15 minutes of inactivity
- First request after inactivity takes 30-60 seconds to wake up
- Database has 1GB storage limit
- 750 hours/month of runtime

💡 **Tips:**
- Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your app every 14 minutes to keep it awake
- Database persists even when web service is sleeping

### Other Deployment Options

#### Deploy to Heroku

1. Create a Heroku account at https://heroku.com
2. Install Heroku CLI: `npm install -g heroku`
3. Login: `heroku login`
4. Create app: `heroku create your-app-name`
5. Add PostgreSQL: `heroku addons:create heroku-postgresql:essential-0`
6. Set environment variables:
   ```bash
   heroku config:set SECRET=your_secret_key
   heroku config:set BALLDONTLIE_API_KEY=your_api_key
   ```
7. Deploy: `git push heroku main`
8. Run migrations: `heroku run npx sequelize-cli db:migrate`
9. Open app: `heroku open`

#### Other Platforms
- **Railway:** https://railway.app (Free tier with PostgreSQL)
- **DigitalOcean App Platform:** https://www.digitalocean.com/products/app-platform

## 📋 RESTful ROUTES

### Authentication Routes
| VERB | URI Path | CRUD | Description |
|:---:|:---:|:---:|:---:|
| POST | `/users` | Create | Sign up/registration to be a user |
| GET | `/users/profile` | Read | Displays user profile |
| GET | `/users/login` | Read | User login page |
| POST | `/users/login` | Create | User login action |
| GET | `/users/logout` | Read | User logout |
| PUT | `/users/profile` | Update | User updates password |

### Player Routes
| VERB | URL Path | CRUD | Description |
|:---:|:---:|:---:|:---:|
| GET | `/players` | Read | Search players by name |
| GET | `/players/favorites` | Read | List of favorited players |
| POST | `/players/favorites` | Create | Add to favorites |
| DELETE | `/players/favorites` | Destroy | Removes the favorited player |

### Comment Routes
| VERB | URL Path | CRUD | Description |
|:---:|:---:|:---:|:---:|
| POST | `/comments/favorites` | Create | Add notes to favorites |
| PUT | `/comments/favorites/:commentId` | Update | Edits the created note |
| DELETE | `/comments/favorites/:commentId` | Destroy | Removes the created note |

## 📊 ERD (Entity Relationship Diagram)

![ERD](wireframes/ERD.png)

### Database Schema

**Users Table:**
- id (Primary Key)
- email (VARCHAR 255)
- password (VARCHAR 255, hashed)
- username (VARCHAR 255)

**Players Table:**
- id (Primary Key)
- firstname (VARCHAR 255)
- lastname (VARCHAR 255)
- age (NUMBER)
- height (NUMBER)
- weight (NUMBER)

**User_Players Table (Join Table):**
- id (Primary Key)
- userId (Foreign Key → users.id)
- playerId (Foreign Key → players.id)

**Comments Table:**
- id (Primary Key)
- userId (Foreign Key → users.id)
- playerId (Foreign Key → players.id)
- note (STRING)

## ✅ MVP (Minimum Viable Product)

- ✅ Login / Sign up route page getting rendered
- ✅ Update ability for user password
- ✅ Profile route to search and display players by their name, logout option
- ✅ Able to add a player to your favorites and redirects to favorites page
- ✅ Favorites route page displays all favorited players, can delete from list
- ✅ Comments section on favorites list where notes can be added about favorites list
- ✅ Edit/update your comments and delete them

## 🎯 STRETCH GOALS

- ✅ Modern, responsive styling with custom CSS
- ✅ Improved user interface with better visual hierarchy
- ✅ Enhanced player cards with detailed information
- 🔄 More details about players (stats, career info)
- 🔄 Team filtering and sorting
- 🔄 Player comparison feature
- 🔄 Dark mode toggle

## 🎨 WIREFRAMES

### Home Page
![Home Wireframe](wireframes/index.jpg)

### Profile Page
![Profile Wireframe](wireframes/Profile.jpg)

### Favorites Page
![Favorites Wireframe](wireframes/favorites.jpg)

## 🐛 TROUBLESHOOTING

**Database connection issues:**
- Ensure PostgreSQL is running
- Check your DATABASE_URL in `.env`
- Verify database exists: `psql -l`

**API errors:**
- Verify your BALLDONTLIE_API_KEY is correct
- Check API rate limits (free tier: 5 requests/min)
- Ensure you're connected to the internet

**Migration errors:**
- Try: `sequelize db:migrate:undo:all`
- Then: `sequelize db:migrate`

## 📝 LICENSE

ISC

## 👨‍💻 AUTHOR

[ikarabag1](https://github.com/ikarabag1)

## 🤝 CONTRIBUTING

Contributions, issues, and feature requests are welcome!

---

**Enjoy tracking your favorite NBA players! 🏀⭐**
