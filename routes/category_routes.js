const CategoryController = require('../controllers/category_controller')
const { authorize, authenticate } = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', CategoryController.getCategories)
router.get('/:id', CategoryController.getCategories)
router.use(authenticate)
router.post('/', authorize, CategoryController.createCategory)
router.put('/:id', authorize, CategoryController.updateCategory)
router.delete('/:id', authorize, CategoryController.deleteCategory)

module.exports = router