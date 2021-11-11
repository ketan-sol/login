const crypto = require('crypto');
const User = require('../models/User')
const Transaction = require('../models/Transactions')
const userService = require('./user.service')
const mongoose = require('mongoose')

const transfer = async (user,amount) => {
  const transactionId = crypto.randomBytes(2).toString('hex');

  try {
    const x  = await userService.getUserById("sender's id")
    const balance = x.balance
    console.log(balance)
    console.log(amount)
  
    if (balance < amount) {
      console.log('Insufficient funds')
    }

    // Update my balance
    const newBalance = balance - amount;
    await User.findByIdAndUpdate( "sender's id" , { balance: newBalance },
      {
        useFindAndModify: false,
        new: true,
      })

        // Update third-party balance
        const receiverBalance = balance + amount
        await User.findByIdAndUpdate( "receivers's id" , { balance: receiverBalance },
          {
            useFindAndModify: false,
            new: true,
          })

    const transaction = new Transaction({
      transactionId,
      operation: 'transfer',
      amount: amount,
    })
    await transaction.save();
    if (!transaction) {
      console.log('Transaction failed');
    }
    return { transaction };
  } catch (error) {
      console.log(error)
  }
}



module.exports = { transfer }