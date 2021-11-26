const bip39 = require('bip39')
const HDKey = require('hdkey')
const ethUtil = require('ethereumjs-util')

const mnemonic = bip39.generateMnemonic() //generates string
const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex') //creates seed buffer
const buffSeed = Buffer.from(seed,'hex')
const hdkey = HDKey.fromMasterSeed(buffSeed)
const masterPrivateKey = hdkey.privateKey.toString('hex')
const addrNode = hdkey.derive("m/44'/60'/0'/0/0") //line 1
const publicKey = ethUtil.privateToPublic(addrNode._privateKey)
const privateKey = (addrNode._privateKey).toString('hex')
const addr = ethUtil.publicToAddress(publicKey).toString('hex')
const address = ethUtil.toChecksumAddress('0x' + addr)

module.exports = { privateKey, publicKey, address }


