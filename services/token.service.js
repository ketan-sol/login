const fs = require('fs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const Token  = require('../models/token')
const key = require('./keys')


const generateToken = (userId) => {
  const payload = {
    user: userId, 
  }
  return jwt.sign(payload,key.privateKey);
};


const saveToken = async (token, userId, expires, type,algorithm, blacklisted = false) => {
  const tokenDoc = await Token.create ({
    token,
    user: userId,
    expires: expires,
    algorithm: 'RS256',
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token,key.publicKey);
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