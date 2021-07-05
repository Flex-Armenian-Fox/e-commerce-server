'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const route = require('./routes/route-main.js')
const errorHandler = require('./helpers/errorHandler.js')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(route)
app.use(errorHandler)

module.exports = app