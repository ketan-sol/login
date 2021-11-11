const router = require('express').Router()
const auth = require('../controllers/auth')
const transaction = require('../controllers/transaction')


router.post('/register', auth.register)
router.post('/login', auth.login)
router.patch('/transfer',  transaction.transfer)


module.exports = router