'use strict'

const router = require('express').Router()
const ControllerUser = require('../controller/Controller-user.js')
const ControllerProduct = require('../controller/Controller-product.js')
const { route } = require('../app.js')
const authentication = require('../helpers/authentication.js')

// ROUTER - USERS
// router.post('/users/register', ControllerUser.register)
router.post('/users/login', ControllerUser.login)

// ROUTER - PRODUCTS (CRUD)
router.use(authentication)
router.get('/products', ControllerProduct.displayAll)

// di bawah ini harus ada AUTHORISATION
// router.post('/products', ControllerProduct.createNew)
// router.put('/products/:id', ControllerProduct.editOne)
// router.delete('/products/:id', ControllerProduct.deleteOne)

module.exports = router