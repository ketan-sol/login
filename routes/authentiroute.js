const router = require('express').Router()
const auth = require('../controllers/auth')
const transaction = require('../controllers/transaction')


router.post('/register', auth.register)
router.post('/login', auth.login)
router.post('/transfer',  transaction.transfer)
router.post('/transactions', transaction.getTransactions)


module.exports = router