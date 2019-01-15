const BAD_REQ = 400
const UNAUTH = 401
const FORBIDDEN = 403
const NOTFOUND= 404
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
    
    /*
    db.City.find({})
    .then(city=>{
        if (!city) {
            return res.status(NOTFOUND).json({
                "error": NOTFOUND, "message": "city not found"
            })
        }
        let cities = []
        city.map(c=>{
            cities.push({
                name: c.name,
                image: c.image,
                description: c.description
            })
        })
        return res.json({cities})
    })
    //*/
})


/**
 * GET ALL
 */
router.get("/posts/all",(req,res)=>{
    db.Post.find({})
    .then(posts => {
        db.City.find({})
        .then(cities => {
            cities.map(c => {
                let filteredCities = posts.filter(post => post.city === c.name)
                c.filteredCities = filteredCities
                console.log(filteredCities)
            } )
            return res.json(cities)
            
        })
        
    })
    /*
    .then(city=>{
        if (!city) {
            return res.status(NOTFOUND).json({
                "error": NOTFOUND, "message": "city not found"
            })
        }
        let cities = []
        city.map(c=>{
            cities.push({
                name: c.name,
                image: c.image,
                description: c.description
            })
        })
        return res.json({cities})
    })
    //*/
})


router.get("/all",(req,res)=>{
    db.City.find({})
    .then(city=>{
        if (!city) {
            return res.status(NOTFOUND).json({
                "error": NOTFOUND, "message": "city not found"
            })
        }
        let cities = []
        city.map(c=>{
            cities.push({
                name: c.name,
                image: c.image,
                description: c.description
            })
        })
        return res.json({cities})
    })
})
/**
 * GET ONE 
 */
router.get("/:id",(req,res)=>{
    db.City.findById(req.params.id)
    .then(city=>{
        if (!city) {
            return res.status(NOTFOUND).json({
                "error": NOTFOUND, "message": "city not found"
            })
        }
        return res.json({city}) 
    })
})


module.exports = router

// create a new route called cities/:id/posts


router.get('/:name/posts', (req, res) => {

    let searchName = []
    req.params.name.split("-").map(word=>{
        searchName.push(word.charAt(0).toUpperCase()+word.slice(1))
    })
    searchName= searchName.join(" ")
    console.log(searchName)
    db.City.find({"name":searchName})
    .then(cty => {
        if (!cty) {
            return res.status(NOTFOUND).json({
                'error': NOTFOUND, 'message': 'city not found'
            })
        }
        let c = cty[0]
        db.Post.find({"city": c.name}).populate('author')
        .then(posts=>{
            console.log(posts)
            let city = {
                "id": c.id, "name": c.name, 
                "description": c.description, 
                "image": c.image
            }
            let cityPosts = []

            posts.map(p => {
                let post = {
                    'id': p.id,
                    'title': p.title,
                    'body': p.body,
                    'date': p.date,
                    'author': p.author.username,
                    'city': p.city,
                    'image': p.image
                }
                cityPosts.push(post);
            })
        
            city.posts = cityPosts
            return res.json({city})
        })
        
    })
})