const router = require('express').Router()
const ProductController = require('../controllers/product_controller')
const { authorize, authenticate } = require('../middlewares/auth')

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProducts)
router.use(authenticate)
router.post('/', authorize, ProductController.createProduct)
router.put('/:id', authorize, ProductController.updateProduct)
router.delete('/:id', authorize, ProductController.deleteProduct)

module.exports = router