const jwt = require('jsonwebtoken')
const moment = require('moment')
const Token  = require('../models/token')



const generateToken = (userId, secret) => {
  const payload = {
    user: userId,
    secret: process.env.SECRET  
  }
  return jwt.sign(payload,process.env.SECRET);
};


const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create ({
    token,
    user: userId,
    expires: expires,
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, process.env.SECRET);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(30, 'minutes')
  const accessToken = generateToken(user.id, accessTokenExpires);

  const refreshTokenExpires = moment().add(1, 'day')
  const refreshToken = generateToken(user.id, refreshTokenExpires);
  await saveToken(refreshToken, user.id, refreshTokenExpires, 'refresh');

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires
    }
  }
}

module.exports = { generateToken, saveToken,verifyToken, generateAuthTokens }