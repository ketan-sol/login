const express = require('express')
const app = express()
const dotenv = require('dotenv')
const auth = require('../controllers/auth')
const mongoose = require('mongoose')
const router = require('../routes/authentiroute')
dotenv.config()

mongoose.connect(process.env.CONNECT, () => {
    console.log('connected to database')
})

app.use(express.json())
app.use('/api/user', router)


app.listen(3000, () => console.log('connected to server and running'))