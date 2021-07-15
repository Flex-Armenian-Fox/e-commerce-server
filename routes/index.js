const router = require('express').Router()
const {authentication} = require('../middlewares/auth.js')

router.use('/users', require('./users.js'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))

router.use(authentication)
router.use('/carts', require('./products'))

module.exports = router
