const UNAUTH = 401
const FORBIDDEN = 403
const NOTFOUND = 404
const INTERNAL_ERR = 500

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../models');

const mongoose = require('../db/connection')
const passport = require('../config/passport')
const config = require('../config/config')

// verify token
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
 * GET ALL
 */
router.get("/all", (req,res)=>{
    db.Post.find({}).populate("author")
    .then((posts)=>{
        let obj=[]
        posts.map((post)=>{
            console.log(post)
            obj.push({
                "id": post._id,
                "title": post.title,
                "body": post.body,
                "date": post.date,
                "city": post.city,
                "author": post.author.username
            })
        })
        return res.json(obj)
    })
    .catch((err)=>{
        return res.status(INTERNAL_ERR).json({"error": err})
    })
})


/**
 * GET ONE
 */
router.get("/:id", (req,res)=>{
    db.Post.findById(req.params.id).populate("author")
    .then((post)=>{
        if (post===null) {
            return res.status(NOTFOUND).json({"error": "post not found"})
        }
        let obj = {
            "id": post._id,
            "title": post.title,
            "body": post.body,
            "date": post.date,
            "city": post.city,
            "author": post.author.username
        }
        console.log(obj)
        return res.json(obj)
    })
    .catch((err)=>{
        return res.status(INTERNAL_ERR).json({"error": err})
    })
})


module.exports = router