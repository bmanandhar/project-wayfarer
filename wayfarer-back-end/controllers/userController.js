const SALT_FACTOR= 10
const BAD_REQ = 400
const UNAUTH = 401
const FORBIDDEN = 403
const NOTFOUND = 404
const INTERNAL_ERR = 500

const EXPIRE= "12h"
const defaultImg = "images/default_profile.jpg"
const maxFileSize = 10*1024*1024

const mongoose = require('../db/connection')

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
let multerStorage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: ( req, file, cb )=> {
        cb( null, "post_"+createTimeStamp(false)+"_"+file.originalname);
    }
})
const upload = multer({
    storage: multerStorage,
    limits: { fileSize: maxFileSize }
})

const db = require('../models')

const passport = require('../config/passport')
const config = require('../config/config')


/* /////////////// HELPER FUNCTIONS /////////////// */

// add zero to month and/or day if 0 <= x <= 9
function padZero(num) { return (num>=0 && num<=9) ? `0${num}`: `${num}` }

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

// parse city name from space separated to dash-separated and lowercase
function parseCityNameLower(name) {
    let searchName = []
    name.split(" ").map(word=>{
        searchName.push(word.charAt(0).toLowerCase()+word.slice(1))
    })
    return searchName.join("-")
}

function createTimeStamp(timeRequired) {
    let today = new Date();
    let timestamp = `${today.getFullYear()}-${padZero(today.getMonth()+1)}-${padZero(today.getDate())}`
    if (timeRequired) {
        console.log(today.getHours(),today.getMinutes())
        timestamp = `${timestamp}T${padZero(today.getHours())}:${padZero(today.getMinutes())}:${padZero(today.getSeconds())}`
    }
    return timestamp;
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
        let timestamp = createTimeStamp(false)
        
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
        db.Post.find({author: decoded.id}).sort({date: -1})
        .then(posts=>{
            //console.log(posts)
            let resPosts = []
            posts.map(post=>{
                resPosts.push({
                    "id": post._id,
                    "title": post.title,
                    "body": post.body,
                    "author": obj.username,
                    "date": post.date.replace("T"," at "),
                    "city": post.city,
                    "image": post.image
                })
            })
            obj.posts = resPosts
            return res.json(obj)
        })
    })
    
})


/**
 * EDIT POST
 */
router.put("/posts/:id", upload.any(), (req,res)=>{
    console.log("header: ",req.headers.authorization!==undefined)

    if (req.headers.authorization===undefined) {
        return res.status(FORBIDDEN).json({"error": FORBIDDEN, "message": "forbidden"})
    }
    
    let token = req.headers.authorization.split(" ")[1]
    let decoded = verifyToken(token)
    console.log(decoded.iat,decoded.exp)
    
    let post_id = req.params.id

    let data = req.body
    if (!(data.city && data.title && data.body)) {
        return res.status(BAD_REQ).json({
            "error": BAD_REQ, "message": "invalid form"
        })
    }

    db.Post.findById(post_id).populate('author')
    .then(post=>{
        if (!post) {
            return res.status(NOTFOUND).json({
                "error": NOTFOUND, "message": "no post found"
            })
        }
        if (post.author.id.toString()!==decoded.id) {
            return res.status(UNAUTH).json({
                "error": UNAUTH, "message": "invalid operation"
            })
        }

        let image_path = data.image
        if (req.files.length>0) { image_path= req.files[0].path.replace("public/","") }
        let editPostObj = {
            title: data.title,
            body: data.body,
            city: data.city,
            image: image_path,
        }
        console.log("abc")
        console.log(editPostObj.city)
        console.log("deg")
        //return res.status(INTERNAL_ERR).json({"error": INTERNAL_ERR, "message": "cannot save post" })
        db.Post.findByIdAndUpdate(post_id,editPostObj,{"new": true})
        .then(resPost=>{
            console.log(resPost.city)
            return res.json({
                id: resPost._id,
                title: resPost.title,
                body: resPost.body,
                city: resPost.city,
                image: resPost.image,
                date: resPost.date.replace("T"," at "),
                author: post.author.username
            })
        })
        .catch(err=>{
            console.log(err)
            return res.status(INTERNAL_ERR).json({
                "error": INTERNAL_ERR, "message": "cannot save post"
            })
        })
    })
})

/**
 * DELETE POST
 */
router.delete("/posts/:id", (req,res)=>{
    console.log("header: ",req.headers.authorization!==undefined)
    
    if (req.headers.authorization===undefined) {
        return res.status(FORBIDDEN).json({
            "error": FORBIDDEN, "message": "forbidden"
        })
    }
    
    let token = req.headers.authorization.split(" ")[1]
    let decoded = verifyToken(token)

    console.log(decoded.iat,decoded.exp)
    
    let post_id = req.params.id

    db.Post.findById(post_id)
    .then(post=>{
        if (!post) {
            return res.status(NOTFOUND).json({
                "error": NOTFOUND, "message": "no post found"
            })
        }
        if (post.author.toString()!==decoded.id) {
            return res.status(UNAUTH).json({
                "error": UNAUTH, "message": "invalid operation"
            })
        }
        db.Post.findByIdAndRemove(post_id)
        .then(deletedPost=>{
            if (!deletedPost) {
                return res.status(NOTFOUND).json({"error": NOTFOUND, "message": "no post found"})
            }
            return res.json({"post": deletedPost})
        })
    })
})


/**
 * CREATE NEW POST
 */
router.post("/posts/new", upload.any(), (req,res)=>{
    console.log("header: ",req.headers.authorization!==undefined)
    
    if (req.headers.authorization===undefined) {
        return res.status(FORBIDDEN).json({
            "error": FORBIDDEN, "message": "forbidden"
        })
    }
    
    let token = req.headers.authorization.split(" ")[1]
    let decoded = verifyToken(token)

    console.log(decoded.iat,decoded.exp)
    
    
    if (req.files.size>=maxFileSize) {
        return res.status(BAD_REQ).json({
            "error": BAD_REQ, "message": "image max size 10MB"
        })
    }

    let data = req.body
    if (!(data.city && data.title && data.body)) {
        return res.status(BAD_REQ).json({
            "error": BAD_REQ, "message": "invalid form"
        })
    }
    
    // find user by id
    db.User.findById(decoded.id)
    .then(user=>{
        if (!user) {
            return res.status(UNAUTH).json({
                "error": UNAUTH, "message": "user not found"
            })
        }
        
        let timestamp = createTimeStamp(true)
        let image_path = `images/${parseCityNameLower(data.city)}2.jpeg`
        if (req.files.length>0) { image_path= req.files[0].path.replace("public/","") }
        let newPost = {
            title: data.title,
            body: data.body,
            city: data.city,
            image: image_path,
            author: decoded.id,
            date: timestamp
        }
        
        db.Post.create(newPost)
        .then(post=>{
            return res.json({
                id: post._id,
                title: post.title,
                body: post.body,
                city: post.city,
                image: post.image,
                date: post.date.replace("T"," at "),
                author: user.username
            })
        })
        .catch(err=>{
            console.log(err)
            return res.status(INTERNAL_ERR).json({
                "error": INTERNAL_ERR, "message": "cannot save post"
            })
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