'use strict'

function errorHandler (err, req, res, next) {

    console.log('INI err.name ===> ', err.name)

    let statusCode = 0

    switch (err.name) {

        case 'SequelizeValidationError':
            statusCode = 400
            break

        case 'Not Found':
            statusCode = 404
            break
            
        case 'Not Authorised':
        case 'JsonWebTokenError':
            statusCode = 401
            break

        case 'Conflicted':
            statusCode = 409
            break

        default:
            statusCode = 500
    }

    res.status(statusCode).json({error: err})

}

module.exports = errorHandler