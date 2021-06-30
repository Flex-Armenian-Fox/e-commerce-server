'use strict'

const router = require('express').Router()
const ControllerUser = require('../controller/Controller-user.js')

router.post('/users/register', ControllerUser.register)

module.exports = router