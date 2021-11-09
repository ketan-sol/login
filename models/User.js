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
    },
    balance: {
        type: Number,
        min: 0,
        default: 50
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet'
    },
    role: {
        type: String,
        default: 'user'
    },
})

module.exports = mongoose.model('User',userSchema)
