const express = require('express')
const router = express.Router()
const UserC = require('../controllers/user.js')
const productC = require('../controllers/product')
const tagC = require('../controllers/tags')
const cartC = require('../controllers/cart-controller')
const {authentication, adminAuth, authorization} = require('../middlewares/auth')
const checkStock = require('../middlewares/checkStock')

// user
router.post('/login', UserC.login)
router.post('/register', UserC.register)
router.post('/glogin', UserC.gLogin)

// general
router.get('/products', productC.getProduct)

// admin
router.post('/products', authentication, adminAuth, productC.postProduct)
router.put('/products/:id', authentication, adminAuth, productC.putProduct)
router.delete('/products/:id', authentication, adminAuth, productC.delProduct)
router.post('/tags', authentication, adminAuth, tagC.postTag)
router.put('/tags/:id', authentication, adminAuth, tagC.putTag)
router.delete('/tags/:id', authentication, adminAuth, tagC.delTag)
router.get('/tags', tagC.getTag)
router.post('/productTag', authentication, adminAuth, tagC.addTag)
router.delete('/productTag/:id', authentication, adminAuth, tagC.removeTag)

// customer
router.post('/cart/:id', authentication, checkStock, cartC.addCart)
router.post('/buy/:id', authentication, checkStock, cartC.buyItem)
router.get('/cart/', authentication, cartC.getCart)
router.delete('/cart/:id', authentication, authorization, cartC.delCart)


module.exports = router