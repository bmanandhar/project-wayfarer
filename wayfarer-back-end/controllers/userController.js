const SALT_FACTOR= 10
const UNAUTH = 401
const FORBIDDEN = 403
const NOTFOUND = 404
const INTERNAL_ERR = 500

const EXPIRE= "12h"

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../models');

const mongoose = require('../db/connection')
const passport = require('../config/passport')
const config = require('../config/config')


// add zero to month and/or day if 1 <= x <= 9
function padZero(num) { return (num>=1 && num<=9) ? `0${num}`: `${num}` }

// verfify token
function verifyToken(token) {
    let decoded = {}
    jwt.verify(token,config.jwtSecret,function(err,verified) {
        if (err) {
            decoded= {"error": err.message}
        } else {
            decoded = verified
        }
    })
    return decoded
}


/** 
 * SIGNUP
 */
router.post('/signup', (req, res) => {
    if (req.body.email && req.body.password) {
        let newUser= {};
        bcrypt.hash(req.body.password,SALT_FACTOR,(err,hash)=>{
            if (err) {
                return res.status(UNAUTH).json({error: err})
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
                                let token = jwt.sign(payload,config.jwtSecret,{
                                    //expiresIn:  EXPIRE
                                })
                                return res.json({ token })
                            } else {
                                return res.status(UNAUTH).json({error: "wrong token..."})
                            }
                        })
                    } else {
                        return res.status(UNAUTH).json({error: "user existed..."})
                    }
                })
            }
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
                    let token = jwt.sign(payload,config.jwtSecret,{
                        expiresIn:  EXPIRE
                    })
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


/** 
 * GET ONE
 */
router.get('/',(req,res)=>{
    console.log("header: ",req.headers.authorization!==undefined)
    if (req.headers.authorization!==undefined) {

        let token = req.headers.authorization.split(" ")[1]
        //console.log(token)
        //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjM2FlMGQ5NzllMTdmMjEzOWU0OTAxYSIsImlhdCI6MTU0NzM2MjUyMX0.s8uu7aHMLBuvMVeYq1zonpZ1YnAjMZbUXYbQoXTYVHH"
        let decoded = verifyToken(token)
        
        if (decoded.id===undefined) { 
            console.log(decoded)
            return res.status(UNAUTH).json(decoded) 
        }
        console.log(decoded.iat,decoded.exp)
        
        // find user by id
        db.User.findById(decoded.id)
        .then(user=>{

            if (user) {
                // save results to object
                let obj = {
                    "username": user.username,
                    "email": user.email,
                    "city": user.city,
                    "joindate": user.joindate,
                    "image": user.image,
                }

                // find posts associated with user_id 
                db.Post.find({author: decoded.id})
                .then(posts=>{
                    //console.log(posts)
                    let resPosts = []
                    posts.map(post=>{
                        resPosts.push({
                            "title": post.title,
                            "body": post.body,
                            "author": obj.username,
                            "date": post.date
                        })
                    })
                    obj.posts = resPosts
                    return res.json(obj)
                })
            } else {
                return res.status(UNAUTH).json({error: "no user found"})
            }
        })
    } else {
        return res.status(FORBIDDEN).json({error: "forbidden"})
    }
})


/**
 * PATCH DATA
 */
router.patch("/",(req,res)=> {
    
    console.log("header: ",req.headers.authorization!==undefined)
    if (req.headers.authorization!==undefined) {
        
        let token = req.headers.authorization.split(" ")[1]
        let decoded = verifyToken(token)
        
        if (decoded.id===undefined) { return res.status(UNAUTH).json(decoded) }
        console.log(decoded.iat,decoded.exp)
        
        //console.log(decoded.id)
        //console.log(req.body)
        
        db.User.findOneAndUpdate(
            {'_id': decoded.id},
            {'$set': req.body },
            {upsert: false},
        ).then((user)=>{
            if (user) {
                return res.json({
                    message: "updated",
                    body: req.body,
                })
            } else {
                return res.status(NOTFOUND).json({error: "no user found"})
            }
        })
        .catch(err=>{return res.status(INTERNAL_ERR).json({error: err})})
    } else {
        return res.status(FORBIDDEN).json({error: "forbidden"})
    }
})


module.exports = router