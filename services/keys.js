const crypto = require('crypto');

  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 512,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  })
console.log(privateKey)
console.log(publicKey)

  module.exports = { privateKey, publicKey}