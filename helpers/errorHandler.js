'use strict'

function errorHandler (err, req, res, next) {

    console.log('MASUK ERROR HANDLER !!!!')
    console.log('INI err.name ===> ', err.name)

    let statusCode = 0

    switch (err.name) {

        case 'SequelizeValidationError':
            console.log('MASUK ERROR HANDLER - SequelizeValidationError !!!')
            statusCode = 400
            break

        case 'Not Found':
        case 'Not Authorised':
            console.log('MASUK ERROR HANDLER - Not Found/Authorised !!!')
            statusCode = 404
            break

        default:
            console.log('MASUK ERROR HANDLER - DEFAULT !!!')
            statusCode = 500
    }

    res.status(statusCode).json({error: err})

}

module.exports = errorHandler