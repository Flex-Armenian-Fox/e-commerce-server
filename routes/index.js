const express = require('express')
const router = express.Router()
const UserC = require('../controllers/user.js')

router.post('/login', UserC.login)

module.exports = router