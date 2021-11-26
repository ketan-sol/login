const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.API));
const Common = require('@ethereumjs/common')
const common =  new Common.default({ chain: 'ropsten' })
const Tx = require('@ethereumjs/tx').Transaction
const dotenv = require('dotenv')
dotenv.config()

let amount = web3.utils.toHex(1000000000000000000);
const MyToken = require('../build/contracts/MyToken.json')
//const jsonface = abi.abi;
const account1 = "sender's address"
const account2 = "receiver's address"
const address =  'contract addrress'
const privateKey = process.env.KEY
let myContract = new web3.eth.Contract( MyToken.abi, address)



async function transaction(){
const nonce = await web3.eth.getTransactionCount(account1);
let otherData =  await myContract.methods.transfer(account2, amount);
let data = otherData.encodeABI();

const rawTx = {
    nonce: nonce,
    from: account1,
    to: address, //contract address
    data: data,
    gasLimit: web3.utils.toHex(100000) ,
    gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'Gwei')),
    privateKey: privateKey,
}

const transaction =  new Tx(rawTx, {common})
const signedTx = transaction.sign(Buffer.from(privateKey,'hex'))
const serializedTx = signedTx.serialize()
console.log(serializedTx.toString('hex'))


web3.eth.net.isListening()
   .then(() => console.log('is connected'))
   .catch(e => console.log('Something went wrong'));

 web3.eth.sendSignedTransaction(
    `0x${serializedTx.toString('hex')}`
    
 ).on('receipt',console.log)

}

transaction()