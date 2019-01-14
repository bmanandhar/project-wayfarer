const SALT_FACTOR= 10
const BAD_REQ = 400
const UNAUTH = 401
const FORBIDDEN = 403
const NOTFOUND = 404
const INTERNAL_ERR = 500

const EXPIRE= "12h"
const defaultImg = "default_profile.jpg"

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../models');

const mongoose = require('../db/connection')
const passport = require('../config/passport')
const config = require('../config/config')


/* /////////////// HELPER FUNCTIONS /////////////// */

// add zero to month and/or day if 1 <= x <= 9
function padZero(num) { return (num>=1 && num<=9) ? `0${num}`: `${num}` }

// verfify token
function verifyToken(token) {
    let decoded = {}
    jwt.verify(token,config.jwtSecret,function(err,verified) {
        if (err) {
            decoded= {"message": err.message}
        } else {
            decoded = verified
        }
    })
    return decoded
}


/* /////////////// ROUTES AND CONTROLLERS /////////////// */

/** 
 * SIGNUP
 */
router.post('/signup', (req, res) => {
    if (!(req.body.username && req.body.city && req.body.email && req.body.password)) {
        return res.status(BAD_REQ).json({
            "error": BAD_REQ, "message": "data cannot be empty"
        })
    }
    bcrypt.hash(req.body.password,SALT_FACTOR,(err,hash)=>{
        if (err) {
            return res.status(INTERNAL_ERR).json({
                "error": INTERNAL_ERR, "message": "bad password"
            })
        } 
            
        // create timestamp
        let today = new Date();
        let timestamp = `${today.getFullYear()}-${padZero(today.getMonth()+1)}-${padZero(today.getDate())}`
        console.log(timestamp)
        
        // new user object
        let newUser = {
            "email": req.body.email, 
            "password": hash,
            "joindate": timestamp,
            "username": req.body.username,
            "city": req.body.city,
            "image": defaultImg
        }

        // save to db
        db.User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(BAD_REQ).json({
                    "error": BAD_REQ, "message": "email exists"
                })
            }
            db.User.create(newUser)
            .then(user => {
                if (user) {
                    let payload = { id: user.id }
                    let token = jwt.sign(payload,config.jwtSecret,{
                        expiresIn:  EXPIRE
                    })
                    return res.json({ token })
                } else {
                    return res.status(NOTFOUND).json({
                        "error": NOTFOUND, "message": "bad token"
                    })
                }
            })
        })

    })
})


/** 
 * LOGIN
 */
router.post('/login',(req,res)=>{
    if (!(req.body.email && req.body.password)) {
        return res.status(BAD_REQ).json({
            "error": BAD_REQ, "message": "data cannot be empty"
        })
    }
    db.User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(NOTFOUND).json({
                "error": NOTFOUND, "message": "incorrect email"
            })
        }
        bcrypt.compare(req.body.password, user.password, (err,match)=>{
            if (err) {
                return res.status(INTERNAL_ERR).json({
                    "error": INTERNAL_ERR, "message": "bad password"
                })
            }
            if (match) {
                let payload = { id: user.id }
                let token = jwt.sign(payload,config.jwtSecret,{
                    expiresIn:  EXPIRE
                })
                return res.json({ token })
            } else {
                return res.status(UNAUTH).json({
                    "error": UNAUTH, "message": "incorrect email/password"
                })
            } 
        })
    })
})


/** 
 * GET ONE
 */
router.get('/profile',(req,res)=>{
    console.log("header: ",req.headers.authorization!==undefined)
    
    if (req.headers.authorization===undefined) {
        return res.status(FORBIDDEN).json({
            "error": FORBIDDEN, "message": "forbidden"
        })
    }

    let token = req.headers.authorization.split(" ")[1]
    let decoded = verifyToken(token)
    
    if (decoded.id===undefined) { 
        console.log(decoded)
        decoded.error= UNAUTH
        return res.status(UNAUTH).json(decoded) 
    }
    console.log(decoded.iat,decoded.exp)
        
    // find user by id
    db.User.findById(decoded.id)
    .then(user=>{

        if (!user) {
            return res.status(UNAUTH).json({
                "error": UNAUTH, "message": "user not found"
            })
        }
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
                    "date": post.date,
                    "city": post.city
                })
            })
            obj.posts = resPosts
            return res.json(obj)
        })
    })
    
})


/**
 * PATCH DATA
 */
router.patch("/profile",(req,res)=> {
    console.log("header: ",req.headers.authorization!==undefined)
    
    if (req.headers.authorization===undefined) {
        return res.status(FORBIDDEN).json({
            "error": FORBIDDEN, "message": "forbidden"
        })
    }
    
    let token = req.headers.authorization.split(" ")[1]
    let decoded = verifyToken(token)
        
    if (decoded.id===undefined) { 
        console.log(decoded)
        decoded.error= UNAUTH
        return res.status(UNAUTH).json(decoded) 
    }
    console.log(decoded.iat,decoded.exp)
    
    db.User.findOneAndUpdate(
        {'_id': decoded.id},
        {'$set': req.body },
        {upsert: false},
    ).then((user)=>{
        if (!user) {
            return res.status(UNAUTH).json({
                "error": UNAUTH, "message": "user not found"
            })
        }
        return res.json({
            message: "updated",
            body: req.body,
        })
    })
    .catch(err=>{
        return res.status(INTERNAL_ERR).json({
            "error": INTERNAL_ERR, "message": "DB error" 
        })
    })
    
})


module.exports = router