const SALT_FACTOR= 10
const UNAUTH = 401
const FORBIDDEN = 403
const INTERNAL_ERR = 500

const express = require('express')
const router = express.Router()
//const jwt = require('jwt-simple')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../models');

const mongoose = require('../db/connection')

const passport = require('../config/passport')
const config = require('../config/config')


function padZero(num) { return (num>=1 && num<=9) ? `0${num}`: `${num}` }

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
                let timestamp = `${today.getFullYear()}-${padZero(today.getMonth()+1)}-${padZero(today.getDate())}`
                console.log(timestamp)
                
                // new user object
                newUser = {
                    email: req.body.email, 
                    password: hash,
                    joindate: timestamp,
                    username: req.body.username,
                    city: req.body.city,
                    image: "default.jpg"
                }

                // save to db
                db.User.findOne({ email: req.body.email })
                .then((user) => {
                    if (!user) {
                        db.User.create(newUser)
                        .then(user => {
                            if (user) {
                                let payload = { id: user.id }
                                //let token = jwt.encode(payload, config.jwtSecret)
                                let token = jwt.sign(payload,config.jwtSecret,{
                                    //expiresIn:  "1h"
                                })
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
                    //let token = jwt.encode(payload, config.jwtSecret)
                    let token = jwt.sign(payload,config.jwtSecret,{
                        //expiresIn: "1h"
                    })
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
 * GET ONE
 */
router.get('/',(req,res)=>{
    console.log(req.headers.authorization)
    console.log(req.headers.authorization===undefined)
    if (req.headers.authorization!==undefined) {

        let token = req.headers.authorization.split(" ")[1]
        console.log(token)
        let decoded = jwt.verify(token,config.jwtSecret)
        console.log(decoded)

        db.User.findById(decoded.id)
        .then(user=>{
            if (user) {
                let obj = {
                    "username": user.username,
                    "email": user.email,
                    "city": user.city,
                    "joindate": user.joindate,
                    "image": user.image
                }
                res.json(obj)
            } else {
                res.status(UNAUTH).json({error: "no user found"})
            }
        })
    } else {
        res.status(FORBIDDEN).json({error: "forbidden"})
    }
})


/** 
 * GET_ALL
 */
router.get('/all',(req,res)=>{
    if (!true) {
        db.User.find({})
        .then(user=>{
            if (user) {
                res.json({user})
            } else {
                res.status(UNAUTH).json({error: "abc"})
            }
        })
    } else {
        res.status(FORBIDDEN).json({error: `forbidden from ${req.originalUrl}`})
    }
    
})


//router.get('/',(req,res)=>{ db.User.find({}).then(user=> res.json({user}) ) })

module.exports = router