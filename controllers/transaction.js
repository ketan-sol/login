const  transactionService  = require('../services/transaction.service')
const mail = require('./email')


//Wallet Deposit
const deposit =  async (req, res) => {
  const depositResponse = await transactionService.deposit(req.body.user, req.body.amount);
  res.status(400).send(depositResponse)
}


//Wallet Transfer

const transfer = async (req, res) => {
  const transferResponse = await transactionService.transfer(req.body.user, req.body.amount);
  res.status(400).send(transferResponse);
}

// Wallet Transactions

const getTransactions = async (req, res) => {
  const transferResponse = await transactionService.getTransactions(req.body.user);
  res.status(400).send(transferResponse);
}

module.exports = { deposit,transfer,getTransactions}