const express = require('express')  //import express
const app = express() //create an express instance
const ejsLayouts = require('express-ejs-layouts') //import ejs layouts
require('dotenv').config() //allows us to access env vars
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt') //to import hashing passwords pg
const cryptoJS = require('crypto-js')
const db = require('./models/index.js')
const axios = require('axios')
const methodOverride = require("method-override");


// MIDDLEWARES
app.set('view engine', 'ejs') //set the view engine to ejs
// app.use(require("morgan")("dev"));
app.use(ejsLayouts) //tell express we want to use layouts
app.use(cookieParser()) //gives us access to req.cookies
app.use(express.urlencoded({extended: false})) //body parser (to make req.bosy work) --apply to every controoller routes so always put it in indexs.js
app.use(methodOverride("_method"));


// CUSTOM COOKIE MIDDLEWARE
app.use( async (req, res, next) => {
    // there are situation cant do that so we need to wrap it up
    if(req.cookies.userId) {
    // decrypt  incoming userId from cookie and lookup in the db
    const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
    // convert it into readable string --back to actual pk
    const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
    // querying the db for the user with that id
    const user = await db.user.findByPk(decryptedIdString)
    // assigning the founs user to res.locals.user in the routes and user in the ejs
    res.locals.user = user 
    } else res.locals.user = null
    next() //move on to next middleware -- would only move if this next invoked
})

// CONTROLLERS 
// USERS ROUTES
app.use('/users', require('./controllers/users.js'))
// PLAYERS ROUTES
app.use('/players', require('./controllers/players.js'))
// COMMENTS ROUTES
app.use('/comments', require('./controllers/comments.js'))



// EXPRESS ROUTES
// HOME VIEW --GET // to render the form created in new.ejs in views/users
app.get('/', (req, res) => {
    // res.send('HULLO???') //to check on browser if it is working lsitening
    res.render('home')
})

// check for an env PORT, otherwise use 8000
const PORT = process.env.PORT || 8000
// callback function
app.listen(PORT, ()=> {
    // to see if server is running fine
    console.log(`Auth app running on ${PORT}`)
})

