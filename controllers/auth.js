const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const register = async (req,res) => {
    const salt = await bcrypt.genSalt(3)
    const hashedPass = await bcrypt.hash(req.body.password,salt)
    const user =  new User({
       name: req.body.name,
       email: req.body.email,
       password: hashedPass
    })
   try{
       const RegisteredUser = await user.save()
       res.send(RegisteredUser)
   }catch(err){
       res.status(400).send(err)
   }
}

const login = async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Invalid email or password')

    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid email or password')

    const token = jwt.sign({_id: user._id},process.env.SECRET)
    res.header('jwt',token).send('Login successful')
}

module.exports = {register,login}