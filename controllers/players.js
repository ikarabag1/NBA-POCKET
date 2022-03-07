const express = require('express') //to import express
const {
    append
} = require('express/lib/response')
const router = express.Router() // to import routers in controllers
const db = require('../models') //to import models
const bcrypt = require('bcrypt') //to import hashing passwords pg
const cryptojs = require('crypto-js')
const res = require('express/lib/response')
const {
    RowDescriptionMessage
} = require('pg-protocol/dist/messages')

const methodOverride = require('method-override')
const req = require('express/lib/request')

const axios = require('axios').default;
// axios fetches data
// jsonifies it
// makes a big object
// response our function from big data

require('dotenv').config() //process.env.SECRET
// console.log(process.env.RAPID_API_KEY)

// SEARCH on profile
router.get('/nbaplayersapi', (req, res) => {
    // use the request body -- req.body
    // console.log(req.query)
    if (req.query.search) {
        // console.log('insideifcheck')
        const options = {
            method: 'GET',
            url: `https://api-nba-v1.p.rapidapi.com/players/firstName/${req.query.search}`,
            headers: {
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
                'x-rapidapi-key': process.env.RAPID_API_KEY
            }
        };
        console.log(options)
        //   request to api
        axios.request(options)
            .then(function (response) {
                // console.log(response.data.api.players);
                const playerData = response.data.api.players;
                const context = {
                    player: playerData
                }
                // console.log(playerData)
                // home.ejs in views
                res.render('users/display.ejs', {
                    playerData
                })
            }).catch(function (error) {
                console.error(error);
            });
    } else {
        // console.log('insideelse')
        res.render('users/display.ejs', {
            playerData: null
        })
    }
})


// POST ROUTE TO FAVORITE PLAYER USER SEARCHED AND SELECTED
router.post('/nbaplayersapi', async (req, res) => {
    if (res.locals.user) {
        try {
            const userFound = await db.user.findOne({
                where: {
                    id: res.locals.user.id
                }
            })
            const [player, playerCreated] =
            await db.player.findOrCreate({
                where: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    height: req.body.height,
                    weight: req.body.weight
                }
            })
            await userFound.addPlayer(player);
            console.log('The new Favorite player is:', player)
            res.redirect("/players/favorites")

        } catch (err) {
            res.status(400).render('main/404.ejs')
            console.log(err)
        }
    }
})

// GET ROUTE to FAVORITES
router.get('/favorites', async (req, res) => {
    if (res.locals.user) {
        try {
            const userFound = await db.user.findOne({
                where: {
                    id: res.locals.user.id
                }
            })
            const faves = await userFound.getPlayers()
            console.log(faves)
            res.render('users/favorites.ejs', {
                faves
            })
        } catch (err) {
            res.status(400).render('main/404.ejs')
            console.log(err)
        }
    }
})

// DELETE ROUTE from FAVPRITES
router.delete('/nbaplayersapi', async (erq, res) => {
    if (res.locals.user) {
        try {
            const userFound = await db.user.findOne({
                where: {
                    id: res.locals.user.id
                }
            })
            const foundFave = await db.user_players.findOne({
                where: {
                    userId: res.locals.user.id,
                    playerId: req.params.playerId
                }
            })
            await user.foundFave.destroy()
            res.redirect("/users/favorites")
        } catch (err) {
            res.status(400).render('main/404.ejs')
            console.log(err)
        }
    }
})

module.exports = router