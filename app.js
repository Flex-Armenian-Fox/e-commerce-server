require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', routes)

app.use((err, req, res, next) => {
  let statusCode = 500
  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400
      break;

    case "notFound":
      statusCode = 404
      break;

    default:
      break;
  }
  res.status(statusCode).json({ error: err });
});

module.exports = app