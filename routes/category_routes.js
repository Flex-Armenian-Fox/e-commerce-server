const CategoryController = require('../controllers/category_controller')
const { authorize } = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', CategoryController.getCategories)
router.get('/:id', CategoryController.getCategories)
router.post('/', authorize, CategoryController.createCategory)
router.put('/:id', authorize, CategoryController.updateCategory)
router.delete('/:id', authorize, CategoryController.deleteCategory)

module.exports = router