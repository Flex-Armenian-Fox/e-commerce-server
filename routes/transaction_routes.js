const router = require('express').Router()
const TransactionController = require('../controllers/transaction_controller')

router.get('/', TransactionController.getUserTransaction)
router.post('/', TransactionController.createTransaction)

module.exports = router