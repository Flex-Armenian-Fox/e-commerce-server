if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/error_handler')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        name: 'e-commerce server',
        status: 'up',
        server_version: '1.0.0',
        express_version: require('express/package').version
    })
})

app.use('/api', router)

app.use(errorHandler.generate)

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`E-Commerce Server running on port: ${PORT}`))
}

module.exports = app