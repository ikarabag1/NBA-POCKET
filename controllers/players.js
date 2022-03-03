const express = require('express') //to import express
const { append } = require('express/lib/response')
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

const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/firstName/lebron',
    headers: {
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });

module.exports = router