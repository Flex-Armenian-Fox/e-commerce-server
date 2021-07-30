const express = require('express');
const ProductController = require('../controllers/ProductController.js');
const router = express.Router();
const {authorizationRole} = require('../middlewares/auth.js')

router.get('/', ProductController.toList)
router.post('/', authorizationRole, ProductController.addData)
router.put('/:id', authorizationRole, ProductController.updateData)
router.delete('/:id', authorizationRole, ProductController.deleteData)

module.exports = router;