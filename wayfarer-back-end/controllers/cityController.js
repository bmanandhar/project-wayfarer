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

router.get("/all",(req,res)=>{
    db.City.find({})
    .then(city=>{
        if (city) {
            let cities = []
            city.map(c=>{
                cities.push({
                    name: c.name,
                    image: c.image,
                    description: c.description
                })
            })
            res.json({cities})
        } else {
            res.status(NOTFOUND).json({error: "not found"})
        }
    })
})

module.exports = router