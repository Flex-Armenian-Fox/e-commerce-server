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
        const response = new ResponseHelper('error', { name, message })

        return res.status(statusCode).json(response)
    }
}

module.exports = CustomError