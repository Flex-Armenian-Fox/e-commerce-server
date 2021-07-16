const router = require('express').Router()
const userRoutes = require('./user_routes')
const productRoutes = require('./product_routes')
const categoryRoutes = require('./category_routes')
const transactionRoutes = require('./transaction_routes')
const cartRoutes = require('./cart_routes')
const { authenticate } = require('../middlewares/auth')

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/transactions', authenticate, transactionRoutes)
router.use('/carts', authenticate, cartRoutes)

module.exports = router