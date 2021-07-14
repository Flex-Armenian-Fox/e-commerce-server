'use strict'

const router = require('express').Router()

const ControllerUser = require('../controller/Controller-user.js')
const ControllerProduct = require('../controller/Controller-product.js')
const ControllerCart = require('../controller/Controller-cart.js')

const authentication = require('../helpers/authentication.js')
const authorisationAdmin = require('../helpers/authorisationAdmin.js')
const authorisationCustomer = require('../helpers/authorisationCustomer.js')

// ROUTER - USERS
router.post('/users/register', ControllerUser.register) // admin aja
router.post('/users/login', ControllerUser.login)

// ROUTER - PRODUCTS (CRUD)
router.use(authentication)
router.get('/products', ControllerProduct.displayAll)
router.get('/products/:id', ControllerProduct.displayOne)

// ROUTER - CART ('UsersProducts') untuk CUSTOMERS
router.post('/cart/:productId', authorisationCustomer, ControllerCart.addToCart)
// router.get('/cart', authorisationCustomer, ControllerCart.displayAll)
// router.patch('/cart/:id', authorisationCustomer, ControllerCart.editPatch)
// router.put('/cart/:id', authorisationCustomer, ControllerCart.editPut)
// router.delete('/cart/:id', authorisationCustomer, ControllerCart.removeCart)

// di bawah ini harus ada AUTHORISATION ADMIN
router.post('/products', authorisationAdmin, ControllerProduct.createNew)
router.put('/products/:id', authorisationAdmin, ControllerProduct.editOne)
router.delete('/products/:id', authorisationAdmin, ControllerProduct.deleteOne)

module.exports = router