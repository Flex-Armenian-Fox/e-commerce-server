const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();
const {authorizationRole} = require('../middlewares/auth.js')

router.get('/', CategoryController.toList)
router.post('/', authorizationRole, CategoryController.addData)
router.put('/:id', authorizationRole, CategoryController.updateData)
router.delete('/:id', authorizationRole, CategoryController.deleteData)

module.exports = router;