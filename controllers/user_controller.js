const CustomError = require('../middlewares/error_handler')
const { encodePayload } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const { User } = require('../models')
const ResponseHelper = require('../helpers/response_helper')

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body
      const newUser = await User.create({ email, password })
      let response = null

      if (newUser) {
        response = new ResponseHelper('success', {
          id: newUser.id,
          email: newUser.email,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        })

        return res.status(201).json(response)
      }
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email.length || !password.length) {
        throw new CustomError('BadRequest', 'Please provide username or password')
      }

      const user = await User.findOne({
        where: { email }
      })

      if (!user) throw new CustomError('Unauthorized', 'Invalid username or password')

      const checkPassword = comparePassword(password, user.password)

      if (!checkPassword) throw new CustomError('Unauthorized', 'Invalid username or password')

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role
      }
      const token = encodePayload(payload)
      const response = new ResponseHelper('success', { access_token: token })

      return res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller