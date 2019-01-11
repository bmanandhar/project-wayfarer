const mongoose = require('../db/connection')
const db = require('../models')
const users = require('./users')
const cities = require('./cities')

//const User = mongoose.model('User')
//const City= mongoose.model('City')

db.City.remove({})
    .then(_ => {
        db.City.collection.insert(cities)
            .then(seededEntries => {
                console.log(seededEntries)
                process.exit()
            })
    })
    .catch(err => {
        console.log(err)
    })

db.User.remove({})
    .then(_ => {
        db.User.collection.insert(users)
            .then(seeded => {
                console.log(seeded)
                process.exit()
            })
    })
    .catch(err => {
        console.log(err)
    })