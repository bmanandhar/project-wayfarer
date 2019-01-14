const BAD_REQ = 400
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


/* /////////////// HELPER FUNCTIONS /////////////// */

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
 * GET ALL with POSTs
 */
router.get("/posts/all",(req,res)=>{
    // find all posts (with author info)
    db.Post.find().populate("author")
    .then(resPosts=> {
        // find all cities
        db.City.find()
        .then(resCities=>{
            let cities = []
            // find city and post mapping by city.name and post.city
            resCities.map(c=>{
                // create new city object
                let city = {
                    "id": c.id, "name": c.name, 
                    "description": c.description, 
                    "image": c.image
                }
                // get all posts corresponding to city
                let filteredPosts = []
                resPosts.filter(post=>post.city===c.name).map(p=>{
                    let postObj ={
                        "id": p.id,
                        "title": p.title,
                        "body": p.body,
                        "date": p.date,
                        "author": p.author.username
                    }
                    filteredPosts.push(postObj)
                })
                // append the posts to the city object
                city.posts = filteredPosts
                cities.push(city)
            })
            return res.json(cities)
        })
    })
})



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
        return res.status(INTERNAL_ERR).json({
            "error": INTERNAL_ERR, "message": "DB error"
        })
    })
})


/**
 * GET ONE
 */
router.get("/:id", (req,res)=>{
    db.Post.findById(req.params.id).populate("author")
    .then((post)=>{
        if (post===null) {
            return res.status(NOTFOUND).json({
                "error": NOTFOUND, "message": "post not found"
            })
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
        return res.status(INTERNAL_ERR).json({
            "error": INTERNAL_ERR, "message": "DB error"
        })
    })
})


module.exports = router