const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
require('dotenv').config()

// AUTHENTICATION MIDDLEWARE
const isAuthenticated = (req, res, next) => {
    if (!res.locals.user) {
        return res.redirect('/users/login')
    }
    next()
}

// PROFILE --GET ROUTE (Protected)
router.get('/profile', isAuthenticated, (req, res) => {
    res.render('users/profile.ejs', { user: res.locals.user })
})

// NEW --GET ROUTE (Signup page)
router.get('/new', (req, res) => {
    res.render('users/new.ejs', { error: null })
})

// SIGN UP --POST ROUTE 
router.post('/', async (req, res) => {
    try {
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            }
        })
        
        if (!created) {
            console.log('User already exists')
            return res.render('users/new.ejs', {
                error: 'An account with this email already exists. Please login instead.'
            })
        }
        
        // Hash the password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newUser.password = hashedPassword
        await newUser.save()

        // CREATE COOKIE
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        
        // Redirect to profile
        res.redirect('/users/profile')
    } catch (err) {
        console.error('Signup error:', err)
        res.render('users/new.ejs', {
            error: 'An error occurred during signup. Please try again.'
        })
    }
})

// LOGIN --GET ROUTE
router.get('/login', (req, res) => {
    res.render('users/login.ejs', { error: null })
})

// LOGIN --POST ROUTE
router.post('/login', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        
        if (!user) {
            console.log('User not found')
            return res.render('users/login.ejs', {
                error: 'Invalid email or password'
            })
        }
        
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            console.log('Incorrect password')
            return res.render('users/login.ejs', {
                error: 'Invalid email or password'
            })
        }
        
        // Successful login
        console.log('User logged in successfully')
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        
        // Redirect to profile
        res.redirect('/users/profile')
    } catch (err) {
        console.error('Login error:', err)
        res.render('users/login.ejs', {
            error: 'An error occurred during login. Please try again.'
        })
    }
})

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    console.log('Logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

// EDIT PASSWORD --PUT ROUTE (Protected)
router.put('/profile', isAuthenticated, async (req, res) => {
    try {
        const user = await db.user.findByPk(res.locals.user.id)
        
        if (!user) {
            return res.redirect('/users/login')
        }
        
        // Hash the new password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        user.password = hashedPassword
        await user.save()
        
        console.log('Password updated successfully')
        res.redirect('/users/profile')
    } catch (err) {
        console.error('Password update error:', err)
        res.redirect('/users/profile')
    }
})

module.exports = router
