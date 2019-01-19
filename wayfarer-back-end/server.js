const PORTNUM= 8001

const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const passport = require('./config/passport')()

const cityController = require('./controllers/cityController.js')
const userController = require('./controllers/userController.js')
const postController = require('./controllers/postController.js')

const app = express()

app.use(cors())
app.use(parser.json())
app.use(passport.initialize())

app.use(express.static(__dirname + '/public'))


app.use('/cities', cityController)
app.use('/users', userController)
app.use('/posts', postController)

app.use(express.static(__dirname+'/public'))

app.listen(process.env.PORT || PORTNUM, () => console.log(`Listening on port ${PORTNUM}`))
