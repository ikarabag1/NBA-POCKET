const express = require('express') //to import express
const {
    append
} = require('express/lib/response')
const router = express.Router() // to import routers in controllers
const db = require('../models') //to import models
const bcrypt = require('bcrypt') //to import hashing passwords pg
const cryptojs = require('crypto-js')
const res = require('express/lib/response')


const axios = require('axios').default;
// axios fetches data
// jsonifies it
// makes a big object
// response our function from big data

require('dotenv').config() //process.env.SECRET
// console.log(process.env.RAPID_API_KEY)


// // GET SINGLE PLAYER
// const options = {
//     method: 'GET',
//     url: 'https://api-nba-v1.p.rapidapi.com/players/firstName/lebron',
//     headers: {
//       'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
//       'x-rapidapi-key': process.env.RAPID_API_KEY
//     }
//   };

//   axios.request(options).then(function (response) {
//       console.log(response.data.api.players);
//   }).catch(function (error) {
//       console.error(error);
//   });


// //   http://nbaplayersapi?search=lebron

// SEARCH on home
router.get('/nbaplayersapi', (req, res) => {
    // use the request body -- req.body
    console.log(req.query)
    if (req.query.search) {
        console.log('insideifcheck')
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
                console.log(response.data.api.players);
                const playerData = response.data.api.players;
                const context = {player: playerData}
                // home.ejs in views
                res.render('users/profile.ejs', {playerData})
            }).catch(function (error) {
                console.error(error);
            });

    } else {
        console.log('insideelse')
        res.render('users/profile.ejs')
    }


    // console.log(req.body, options)
})

module.exports = router