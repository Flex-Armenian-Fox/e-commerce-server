const express = require('express');
const CartController = require('../controllers/CartController.js');
const router = express.Router();
const {authorizationCart} = require('../middlewares/auth.js')

router.get('/', CartController.toList)
router.post('/', CartController.addData)
router.put('/:id', authorizationCart, CartController.updateData)
router.delete('/:id', authorizationCart, CartController.deleteData)

module.exports = router;