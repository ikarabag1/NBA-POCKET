const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios').default
require('dotenv').config()

// SEARCH on profile - Updated to use BALLDONTLIE API
router.get('/', async (req, res) => {
    if (req.query.search) {
        try {
            // Use BALLDONTLIE API with search parameter
            const options = {
                method: 'GET',
                url: `https://api.balldontlie.io/v1/players`,
                params: {
                    search: req.query.search,
                    per_page: 25
                },
                headers: {
                    'Authorization': process.env.BALLDONTLIE_API_KEY || process.env.RAPID_API_KEY
                }
            }
            
            const response = await axios.request(options)
            const playerData = response.data.data // BALLDONTLIE returns data in 'data' field
            
            res.render('users/display.ejs', {
                playerData
            })
        } catch (error) {
            console.error('API Error:', error.message)
            res.render('users/display.ejs', {
                playerData: null,
                error: 'Failed to fetch player data. Please check your API key.'
            })
        }
    } else {
        res.render('users/display.ejs', {
            playerData: null
        })
    }
})

// GET ROUTE TO ADD TO FAVORITES
router.get('/favorites', async (req, res) => {
    if (res.locals.user) {
        try {
            const userFound = await db.user.findOne({
                where: {
                    id: res.locals.user.id
                }
            })
            const faves = await userFound.getPlayers()
            const comment = await userFound.getComments()

            res.render('users/favorites.ejs', {
                faves,
                comment,
                user: res.locals.user
            })
        } catch (err) {
            res.status(400).render('main/404.ejs')
            console.log(err)
        }
    } else {
        res.redirect('/users/login')
    }
})

// POST ROUTE TO SHOW FAVORITE PLAYERS
router.post('/favorites', async (req, res) => {
    if (res.locals.user) {
        try {
            const userFound = await db.user.findOne({
                where: {
                    id: res.locals.user.id
                }
            })
            
            const [player, playerCreated] = await db.player.findOrCreate({
                where: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                },
                defaults: {
                    height: req.body.height || null,
                    weight: req.body.weight || null,
                    age: req.body.age || null
                }
            })
            
            await userFound.addPlayer(player)
            console.log('The new Favorite player is:', player.firstname, player.lastname)
            res.redirect("/players/favorites")

        } catch (err) {
            res.status(400).render('main/404.ejs')
            console.log(err)
        }
    } else {
        res.redirect('/users/login')
    }
})

// DELETE ROUTE AT FAVORITES
router.delete('/favorites', async (req, res) => {
    if (res.locals.user) {
        try {
            await db.user_players.destroy({
                where: {
                    userId: res.locals.user.id,
                    playerId: req.body.playerId
                }
            })
            res.redirect("/players/favorites")
        } catch (err) {
            res.status(400).render('main/404.ejs')
            console.log(err)
        }
    } else {
        res.redirect('/users/login')
    }
})

module.exports = router
