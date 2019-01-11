const PORTNUM= 8001

const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const passport = require('./config/passport')()

const userController = require('./controllers/userController.js')

const app = express()

app.use(cors())
app.use(parser.json())
app.use(passport.initialize())

//app.use('/api/dogs', dogController)
app.use('/users', userController)

app.listen(PORTNUM, () => console.log(`Listening on port ${PORTNUM}`))
