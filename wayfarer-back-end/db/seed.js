require('../db/connection')
const mongoose = require('mongoose')
const db = require('../models')
const users = require('./users')
const cities = require('./cities')
const posts = require('./posts');



//*
db.City.remove({})
.then(_ => {
    db.City.collection.insert(cities)
        .then(seededEntries => {
            console.log(seededEntries)
            //process.exit()
        })
})
.catch(err => {
    console.log(err)
})
//*/


//*
db.User.remove({})
.then(_ => {
    db.User.collection.insert(users)
    .then(seeded => {
        db.Post.remove({})
        .then(_=>{
            posts.forEach(post=>{
                seeded.ops.forEach(user=>{
                    if (post.author===user.username) {
                        post.author = user._id
                        db.Post.create(post)
                        .then(newPost=>console.log(newPost)).catch(err=>console.log(err))
                    }
                })
            })

        })
    })
})
.catch(err => {
    console.log(err)
})
//*/

