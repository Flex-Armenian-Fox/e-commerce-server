const router = require('express').Router()
const userRoutes = require('./user_routes')
const productRoutes = require('./product_routes')
const { authenticate } = require('../middlewares/auth')

router.use('/users', userRoutes)
router.use('/products', authenticate, productRoutes)

module.exports = router