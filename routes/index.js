const router = require('express').Router()
const {authentication} = require('../middlewares/auth.js')

router.use('/users', require('./users.js'))
router.use(authentication)
router.use('/categories', require('./categories'))
router.use('/products', require('./products'))

module.exports = router
