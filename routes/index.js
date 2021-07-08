const express = require('express')
const router = express.Router()
const UserC = require('../controllers/user.js')
const productC = require('../controllers/product')
const tagC = require('../controllers/tags')
const {authentication, adminAuth} = require('../middlewares/auth')

router.post('/login', UserC.login)
router.post('/products', authentication, adminAuth, productC.postProduct)
router.put('/products/:id', authentication, adminAuth, productC.putProduct)
router.delete('/products/:id', authentication, adminAuth, productC.delProduct)
router.get('/products', authentication, productC.getProduct)

router.post('/tags', authentication, adminAuth, tagC.postTag)
router.put('/tags/:id', authentication, adminAuth, tagC.putTag)
router.delete('/tags/:id', authentication, adminAuth, tagC.delTag)
router.get('/tags', authentication, tagC.getTag)
router.post('/productTag', authentication, adminAuth, tagC.addTag)
router.delete('/productTag/:id', authentication, adminAuth, tagC.removeTag)

module.exports = router