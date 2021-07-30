const router = require('express').Router()
const CartController = require('../controllers/cart_controller')
const { authorizeCustomers } = require('../middlewares/auth')

router.get('/', CartController.getCarts)
router.post('/', CartController.createNewCart)
router.patch('/:id', authorizeCustomers, CartController.patchCart)
router.delete('/:id', authorizeCustomers, CartController.deleteCart)
router.delete('/', CartController.deleteCart)

module.exports = router