const express = require('express') //to import express
const {
    append
} = require('express/lib/response')
const router = express.Router() // to import routers in controllers
const db = require('../models') //to import models
const bcrypt = require('bcrypt') //to import hashing passwords pg
const cryptojs = require('crypto-js')
const res = require('express/lib/response')
require('dotenv').config()
const methodOverride = require('method-override')
const req = require('express/lib/request')

// CONTROLLERS
// PROFILE --GET ROUTE
router.get('/profile', (req, res) => {
    res.render('users/profile.ejs')
})
// NEW --GET ROUTE
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})


// SIGN UP --POST ROUTE 
router.post('/', async (req, res) => { //user is the model name
    const [newUser, created] = await db.user.findOrCreate({ // find or create always get 2 variable into the arrray--will always return two elements in it
        where: {
            email: req.body.email
        }
    })
    if (!created) {
        console.log('User already exists') //please try to login user already exist
        // render the login page and send an appropriate error messsage need to do 
        res.render('users/login.ejs', {error: 'Looks like you already have an account! Try logging in :)'})
    } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10) // to hash that password, how many times
        newUser.password = hashedPassword //to get the password newUser entered
        await newUser.save()

        // CREATE THAT COOKIE!
        // encrypt the user id via AES
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        // store the encrypted id in the cookie of the res obj
        res.cookie('userId', encryptedUserIdString) //storying the encrypted version with secret
        // redirecet back to home page
        res.redirect('/')
        // console.log(whatisthis)
    }
})

// LOGIN --GET ROUTE
// need a login form route
router.get('/login', (req, res) => {
    res.render('users/login.ejs', {
        error: null
    })
})


// EDIT --PUT ROUTE
router.put('/profile', async (req, res) => {
    if (res.locals.user) {
        try {
            const userFound = await db.user.findOne({
                where: {
                    id: res.locals.user.id
                }
            })
            await userFound.update({
                where: {   
                userId: res.locals.user.id ,               
                password: req.body.password
                }
            })
            await userFound.save(password);
            // console.log(userFound)
            // console.log(req.body)
            res.redirect('/')
        } catch (err) {
            res.status(400).render('main/404.ejs')
            console.log(err)
        }
    }
})

// SIGN UP --POST ROUTE
// what should happen in login page
router.post('/login', async (req, res) => {
    // find them
    const user = await db.user.findOne({
        where: {
            email: req.body.email
        }
    })
    if (!user) { //if user not exist send to login page
        console.log('user not found!')
        res.render('users/login.ejs', {
            error: 'Invalid email/password'
        })
    } else if (!bcrypt.compareSync(req.body.password, user.password)) { //found user but password was wrong 
        console.log('Incorrect Password')
        res.render('users/login.ejs', {
            error: 'Invalid email/password'
        })
    } else { //--the boolean returns false -- send them back to the login page
        console.log('logging in the error')
        // encrypt the user id via AES -- if correct
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET) //we want to encrypt 1st one and 2nd value secret is what we encrypted into
        const encryptedUserIdString = encryptedUserId.toString()
        // store the encrypted id in the cookie of the res obj -- new obj persist until cleared
        res.cookie('userId', encryptedUserIdString) //when initiated: (key 1st/value 2nd pair) send to the server to see what user is logged in so can decrypted
        // redirecet back to home page
        res.redirect('/')
    }
})


// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    // logging out
    console.log('logging out')
    // clears the cookie
    res.clearCookie('userId')
    // redirects to home page
    res.redirect('/')
})


// export modules all these routes to the entry point file
module.exports = router