const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const mail = require('./email')
const tokenService = require('../services/token.service')
const userService = require('../services/user.service')
dotenv.config()



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
   //if(register) return (mail.signUp_email())
}

const login = async (req,res) => {
    const user = await User.findOne({name: req.body.name})
    if (!user) return res.status(400).send('Invalid username or password')

    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid username or password')

    const token = await tokenService.generateAuthTokens(user)
    res.send({user,token})
    //if(login) return (mail.login_email())
}

const refreshAuth = async (refreshToken) => {
    try {
      const refreshTokenDoc = await tokenService.verifyToken(refreshToken, 'refresh');
      const user = await userService.getUserById(refreshTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await refreshTokenDoc.remove();
      return tokenService.generateAuthTokens(user);
    } catch (error) {
      res.send(error)   
     }
  }

const refreshTokens = async (req, res) => {
    const tokens = await refreshAuth(req.body.refreshToken)
    res.send({ ...tokens })
}

module.exports = {register,login}