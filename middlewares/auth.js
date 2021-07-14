const { decodePayload } = require('../helpers/jwt')
const { User, Cart } = require('../models')
const CustomError = require('./error_handler')

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.access_token
    const payload = decodePayload(token)
    const user = await User.findByPk(payload.id)

    if (!token) throw new CustomError('Unauthorized', 'invalid token')

    if (!user) {
      throw new CustomError('NotFound', 'User Not Found')
    } else {
      req.currentUser = {
        id: user.id,
        role: user.role
      }  
      next()
    }
  } catch (error) {
    next(error)
  }
}

const authorize = async (req, res, next) => {
  try {
    const token = req.headers.access_token
    const payload = decodePayload(token)
    const user = await User.findByPk(payload.id)

    if (user.role !== 'admin') {
      throw new CustomError('Unauthorized', 'You are not authorized')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

const authorizeCustomers = async (req, res, next) => {
  try {
    const token = req.headers.access_token
    const { id: cartId } = req.params
    const payload = decodePayload(token)
    const cart = await Cart.findOne({
      where: { id: cartId }
    })

    if (!cart) {
      throw new CustomError('NotFound', `Cart with id ${cartId} not found`)
    }

    if (cart.user_id !== payload.id) {
      throw new CustomError('Unauthorized', 'You are not authorized')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { authenticate, authorize, authorizeCustomers }