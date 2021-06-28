const ResponseHelper = require("../helpers/response_helper")

class CustomError extends Error {
    constructor(name, message) {
        super()
        this.name = name
        this.message = message
    }

    static generate(err, req, res, next) {
        let statusCode = 500
        let { name, message } = err

        switch (name) {
            case 'BadRequest':
                statusCode = 400
                break
            case 'Unauthorized':
            case 'JsonWebTokenError':
                statusCode = 401
                break
            default:
                console.error('Uncaught Error =>', err)
                name = 'UncaughtException'
                statusCode = 500
                break
        }
        const response = new ResponseHelper('error', { name, message })

        return res.status(statusCode).json(response)
    }
}

module.exports = CustomError