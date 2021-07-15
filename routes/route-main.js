'use strict'

const router = require('express').Router()

const ControllerUser = require('../controller/Controller-user.js')
const ControllerProduct = require('../controller/Controller-product.js')
const ControllerCart = require('../controller/Controller-cart.js')

const authentication = require('../helpers/authentication.js')
const authorisationAdmin = require('../helpers/authorisationAdmin.js')
const {authCustomerGeneral, authCustomerActions} = require('../helpers/authorisationCustomer.js')

// ROUTER - USERS
router.post('/users/register', ControllerUser.register)
router.post('/users/login', ControllerUser.login)
router.get('/products', ControllerProduct.displayAll)
router.get('/products/:id', ControllerProduct.displayOne)

// ROUTER - PRODUCTS (CRUD)
router.use(authentication)

// ROUTER - CART untuk Customers
router.post('/cart/:productId', authCustomerGeneral, ControllerCart.addToCart)
router.get('/cart', authCustomerGeneral, ControllerCart.displayCart)
//
router.patch('/cart/:cartId', authCustomerGeneral, authCustomerActions, ControllerCart.patchQuantity)
router.delete('/cart/:cartId', authCustomerGeneral, authCustomerActions, ControllerCart.removeCart)

// di bawah ini harus ada AUTHORISATION ADMIN
router.post('/products', authorisationAdmin, ControllerProduct.createNew)
router.put('/products/:id', authorisationAdmin, ControllerProduct.editOne)
router.delete('/products/:id', authorisationAdmin, ControllerProduct.deleteOne)

module.exports = router