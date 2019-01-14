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
 * GET ALL
 */
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