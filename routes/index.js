const express = require('express')
const router = express.Router()
const UserC = require('../controllers/user.js')
const productC = require('../controllers/product')
const authentication = require('../middlewares/auth')

router.post('/login', UserC.login)
router.post('/products', authentication, productC.postProduct)
router.put('/products/:id', authentication, productC.putProduct)

module.exports = router