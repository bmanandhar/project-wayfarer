const SALT_FACTOR= 10
const UNAUTH = 401
const INTERNAL_ERR = 500

const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const db = require('../models');

const mongoose = require('../db/connection')

const passport = require('../config/passport')
const config = require('../config/config')

//const mongoose = require('../models/User')
//const User = mongoose.model('User')

/** 
 * SIGNUP
 */
router.post('/signup', (req, res) => {
    if (req.body.email && req.body.password) {
        let newUser= {};
        bcrypt.hash(req.body.password,SALT_FACTOR,(err,hash)=>{
            if (err) {
                res.status(UNAUTH).json({error: err})
            } else {
                
                // create timestamp
                let today = new Date();
                let todayObj= {
                    'year': today.getFullYear(), 
                    'month': today.getMonth()+1, 
                    'day': today.getDate()
                }
                todayObj['month']= (todayObj['month']>=1 && todayObj['month']<=9)? `0${todayObj['month']}`: todayObj['month'];
                todayObj['day']= (todayObj['day']>=1 && todayObj['day']<=9)? `0${todayObj['day']}`: todayObj['day'];
                let timestamp = `${todayObj['year']}-${todayObj['month']}-${todayObj['day']}`
                
                // new user object
                newUser = {
                    email: req.body.email, password: hash,
                    joindate: timestamp,
                    username: req.body.username,
                    city: req.body.city,
                    image: ""
                }

                // save to db
                db.User.findOne({ email: req.body.email })
                .then((user) => {
                    if (!user) {
                        db.User.create(newUser)
                        .then(user => {
                            if (user) {
                                let payload = { id: user.id }
                                let token = jwt.encode(payload, config.jwtSecret)
                                res.json({ token })
                            } else {
                                res.status(UNAUTH).json({error: "wrong token..."})
                            }
                        })
                    } else {
                        res.status(UNAUTH).json({error: "user existed..."})
                    }
                })
            }
        })
    } else {
        res.status(UNAUTH).json({error: "abc"})
    }
})


/** 
 * LOGIN
 */
router.post('/login',(req,res)=>{
    if (req.body.email && req.body.password) {
        
        db.User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err,match)=>{
                  if (err) {
                    res.status(INTERNAL_ERR).json({ error: err })
                  }
                  if (match) {
                    let payload = { id: user.id }
                    let token = jwt.encode(payload, config.jwtSecret)
                    res.json({ token })
                  } else {
                    res.status(UNAUTH).json({error: "incorrect user/password"})
                  } 
                })
            } else {
                res.status(UNAUTH).json({error: "no user found..."})
            }
        })
    } else {
        res.status(UNAUTH).json({error: "incorrect user/password"})
    }
})

/** 
 * GET_ALL
 */
router.get('/',(req,res)=>{
    db.User.find({})
    .then(user=>{
        if (user) {
            res.json({user})
        } else {
            res.status(UNAUTH).json({error: "abc"})
        }
    })
})


//router.get('/',(req,res)=>{ db.User.find({}).then(user=> res.json({user}) ) })

module.exports = router