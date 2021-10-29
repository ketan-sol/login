const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1020
    }
})

module.exports = mongoose.model('User',userSchema)