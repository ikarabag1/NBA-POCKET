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

## 🌐 HEROKU DEPLOYMENT

**Previous deployment:** https://nba-players-pocket.herokuapp.com/ (no longer active)

**Note:** The original Heroku deployment is no longer available. To deploy your own instance:
1. Create a Heroku account
2. Install Heroku CLI
3. Follow Heroku's deployment guide for Node.js applications
4. Set environment variables in Heroku dashboard

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
