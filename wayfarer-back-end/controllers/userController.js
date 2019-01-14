const SALT_FACTOR= 10
const UNAUTH = 401
const INTERNAL_ERR = 500

const defaultImg = "default_profile.jpg"

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



function padZero(num) { return (num>=1 && num<=9) ? `0${num}`: `${num}` }

/** 
 * SIGNUP
 */
router.post('/signup', (req, res) => {
    console.log(req.body)
    //return res.status(UNAUTH).json({error: "abc"})
    if (req.body.email && req.body.password && req.body.city && req.body.username) {
        bcrypt.hash(req.body.password,SALT_FACTOR,(err,hash)=>{
            if (err) { 
                return res.status(UNAUTH).json({error: err})
            } 
                
            // create timestamp
            let today = new Date();
            let timestamp = `${today.getFullYear()}-${padZero(today.getMonth()+1)}-${padZero(today.getDate())}`
            console.log(timestamp)
            
            // new user object
            let newUser = {
                email: req.body.email, password: hash,
                joindate: timestamp,
                username: req.body.username,
                city: req.body.city,
                image: defaultImg
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
                            return res.json({ token })
                        } else {
                            return res.status(500).json({error: "cannot save user..."})
                        }
                    })
                    .catch(err=>{return res.status(500).json({error: "internal error"})})
                } else {
                    return res.status(UNAUTH).json({error: "user existed..."})
                }
            })
        })
    } else {
        return res.status(UNAUTH).json({error: "abc"})
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
                    return res.status(INTERNAL_ERR).json({ error: err })
                  }
                  if (match) {
                    let payload = { id: user.id }
                    let token = jwt.encode(payload, config.jwtSecret)
                    return res.json({ token })
                  } else {
                    return res.status(UNAUTH).json({error: "incorrect user/password"})
                  } 
                })
            } else {
                return res.status(UNAUTH).json({error: "no user found..."})
            }
        })
    } else {
        return res.status(UNAUTH).json({error: "incorrect user/password"})
    }
})


//router.get('/',(req,res)=>{ db.User.find({}).then(user=> res.json({user}) ) })

module.exports = router