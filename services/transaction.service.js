const crypto = require('crypto');
const User = require('../models/User')
const Transaction = require('../models/Transactions')
const userService = require('./user.service')
const mongoose = require('mongoose')

const transfer = async (user,amount) => {
  const transactionId = crypto.randomBytes(2).toString('hex');

  try {
    const balance  = await userService.getCurrentAmountById(user.id)
    if (balance < amount) {
      console.log('Insufficient funds')
    }

    // Update my balance
    const newBalance = balance - amount;
    await User.findByIdAndUpdate( user.id, { balance: newBalance },
      {
        useFindAndModify: false,
        new: true,
      })

        // // Update third-party balance
        // const emailExists = await userService.getUserByEmail(email);
        // if (!emailExists) {
        //   console.log("Depositor doesn't exist")
        // }
        // const details = await userService.getCurrentAmountByEmail(email);
        // const newBalanceForOtherUser = parseInt(details.balance) + parseInt(money);
        // await User.findOneAndUpdate({ email }, { balance: newBalanceForOtherUser });

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

const getTransactions = async (user) => {
  try {
    const foundUser = await userService.getUserById(user.id);
    if (!foundUser) {
      console.log('User not found');
    }
    const { operation, amount, transactionId } = await Transaction.findById(user.id);
    return { amount, operation, transactionId }
  } catch (error) {
        console.log(error)
  }
};

module.exports = { transfer,getTransactions }