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

// POST ROUTE --CREATE COMMENTS IN FAVORITES LIST
router.post('/favorites', async (req, res) => {
    if (res.locals.user) {
        try {
            const userFound = await db.user.findOne({
                where: {
                    id: res.locals.user.id
                }
            })  
            const [comment, commentCreated] =   
            await db.comment.findOrCreate({
        where: {
        userId: res.locals.user.id,
        note: req.body.note
        }
    })    
        res.redirect("/players/favorites")
    } catch (err) {
        res.status(400).render('main/404.ejs')
        console.log(err)
    }
}
})

// PUT ROUTE --EDIT COMMENTS IN FAVORITES LIST
router.put('/favorites/:commentId', async (req, res) => {
    if (res.locals.user) {
        try {     
            const foundNote = await db.comment.findOne({
                where: {
                    id: req.params.commentId,
                    userId: res.locals.user.id
                }
            })
            console.log(foundNote, 'found')
            const note = await foundNote.update({           
                    note: req.body.note
            })
            console.log(note)
            await foundNote.save(note);
            res.redirect("/players/favorites")
        }catch (err) {
            res.status(400).render('main/404.ejs')
            console.log(err)
        }
    }
})

// DELETE ROUTE --DELETE COMMENTS IN FAVORITES LIST
router.delete('/favorites/:commentId', async (req, res) => {
    if (res.locals.user) {
        try {      
            const foundNote = await db.comment.destroy({
                where: {
                    id: req.params.commentId,
                    userId: res.locals.user.id
                }
            })
            
            res.redirect("/players/favorites")
        } catch (err) {
            res.status(400).render('main/404.ejs')
            console.log(err)
        }
    }
})

module.exports = router