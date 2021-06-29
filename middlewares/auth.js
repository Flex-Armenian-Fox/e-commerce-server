const { decodePayload } = require('../helpers/jwt')
const { User } = require('../models')
const CustomError = require('./error_handler')

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.access_token
        const payload = decodePayload(token)
        const user = await User.findByPk(payload.id)
        
        if (!token) throw new CustomError('Unauthorized', 'invalid token')

        if (!user) throw new CustomError('NotFound', 'User Not Found')

        req.currentUser = {
            id: user.id,
            role: user.role
        }

        next()
    } catch (error) {
        next(error)
    }
}

const authorize = async(req, res, next) => {
    try {
        const token = req.headers.access_token
        const payload = decodePayload(token)
        const user = await User.findByPk(payload.id)

        if (user.role !== 'admin') {
            throw new CustomError('Unauthorized', 'You are not authorized')
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authenticate, authorize }