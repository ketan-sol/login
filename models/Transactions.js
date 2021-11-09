const mongoose = require('mongoose');
const operations = ['deposit', 'transfer'];

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
    },
    operation: {
      type: String,
      required: true,
      enum: operations
    },
    amount: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;