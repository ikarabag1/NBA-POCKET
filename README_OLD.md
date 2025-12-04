# NBA POCKET 
* Now NBA players info are in your pocket to track and to favourite the players you pick.

# INSTALL INSTRUCTIONS
* Fork and clone the repo.
* Run `npm i`.
* Run `createdb nba_pocket` or `create database nba_pocket`. 
* Run `sequelize db:migrate`. 
* API Key required and can be obtained from:
https://rapidapi.com/api-sports/api/api-nba
* Create .env file and locate your API Key: `RAPID_API_KEY`

# TECHs USED
* HTML, JS, CSS
* Node, Express, Axios, Postgres SQL

# USER STORIES
* I would like to search NBA Players by their name and get info on NBA players.
* I would like to create favorite NBA players and keep track on their info, and delete when I want to.
* I would like add note on comment section of favorites list and able to update and remove it.

# HEROKU DEPLOYMENT
https://nba-players-pocket.herokuapp.com/

# RESTful ROUTES
# Authentication
| VERB   | URI Path       | CRUD    | Description      |
| :---: | :------------: | :-----------: | :-----------------: |
| POST   | `/users` | Create | sign up/registeration to be a user |
| GET    | `/users/profile` | Read  | displays user profile  |
| GET   | `/users/login`    | Read   | user login           |
| GET   | `/users/logout`     | Read   | user logout        |
| PUT    | `/users/profile`  | Update   | user updates password    |

# Routes
| VERB   | URL Path   | CRUD    | Description                 |
| :----: | :---------------: | :----------: | :-----------------: |
| GET    | `/players`      | Read     | search players by name    |
| GET  | `/players/favorites`  | Read  | list of players can be favorited   |
| POST   | `/players/favorites` | Create | add to favorites   |
| DELETE | `/players/favorites` | Destroy  | removes the favorited player
| POST   | `/comments/favorites` | Create | add notes to favorites   |
| PUT    | `/comments/favorites/:commentId` | Update | edits the created note |
| DELETE | `/comments/favorites/:commentId` | Destroy | removes the created note |

# ERD
![WireFraming](wireframes/ERD.png)

# MVP
* login / sign up route page getting rendered
* update ability for user password
* Profile route to search and display players by their name, logout option.
* able to add a player to your favorites and redirects to favorites page.
* favorites route page displays all favorited players, can delete from list.
* comments section on favorites list that notes can be added about favorites list and edit/update your comments and delete them.

# STRECH GOALS
* styling with bootstrap.
* more details about players.