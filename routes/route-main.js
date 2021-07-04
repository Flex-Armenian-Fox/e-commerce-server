'use strict'

const router = require('express').Router()
const ControllerUser = require('../controller/Controller-user.js')
const ControllerProduct = require('../controller/Controller-product.js')
const authentication = require('../helpers/authentication.js')
const authorisationAdmin = require('../helpers/authorisation.js')

// ROUTER - USERS
router.post('/users/register', ControllerUser.register) // admin aja
router.post('/users/login', ControllerUser.login)

// ROUTER - PRODUCTS (CRUD)
router.use(authentication)
router.get('/products', ControllerProduct.displayAll)
router.get('/products/:id', ControllerProduct.displayOne)

// di bawah ini harus ada AUTHORISATION ADMIN
router.post('/products', authorisationAdmin, ControllerProduct.createNew)
router.put('/products/:id', authorisationAdmin, ControllerProduct.editOne)
router.delete('/products/:id', authorisationAdmin, ControllerProduct.deleteOne)

module.exports = router