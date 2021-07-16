const { Cart, User, Product, Category } = require('../models')
const ResponseHelper = require('../helpers/response_helper')
const CustomError = require('../middlewares/error_handler')
let response = null

class CartController {
  static async getCarts(req, res, next) {
    try {
      const userId = req.currentUser.id
      const carts = await Cart.findAll({
        where: { user_id: userId },
        attributes: ['id', 'user_id', 'product_id', 'total_quantity', 'createdAt', 'updatedAt'],
        include: [
          {
            model: User,
            attributes: ['id', 'email', 'role']
          },
          {
            model: Product,
            attributes: ['id', 'name', 'image_url', 'price', 'stock'],
            include: {
              model: Category,
              attributes: ['category_name', 'category_description']
            }
          }
        ]
      })
      response = new ResponseHelper('success', carts)
      
      return res.status(200).json(carts)
    } catch (error) {
      next(error)
    }
  }

  static async createNewCart(req, res, next) {
    try {
      const { product_id, total_quantity } = req.body
      const userId = req.currentUser.id
      const { stock } = await Product.findByPk(product_id)

      if (total_quantity > stock) {
        throw new CustomError('BadRequest', 'Total quantity cannot more than product stock')
      }

      const newCart = await Cart.create({
        product_id,
        user_id: userId,
        total_quantity
      })

      if (newCart) {
        response = new ResponseHelper('success', {
          product_id: newCart.product_id,
          user_id: userId,
          total_quantity: newCart.total_quantity
        }) 

        return res.status(201).json(response)
      }
    } catch (error) {
      next(error)
    }
  }

  static async patchCart(req, res, next) {
    try {
      const { id } = req.params
      const { total_quantity } = req.body
      const updatedCart = await Cart.update({
        total_quantity
      }, {
        where: { id },
        returning: true
      })

      if (updatedCart) {
        response = new ResponseHelper('success', updatedCart[1])

        return res.status(200).json(response)
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const cartId = req.params.id || null
      const userId = req.currentUser.id
      let deleted = null

      if (!cartId) { //Delete seluruh cart milik user yang login.
        deleted = await Cart.destroy({
          where: { user_id: userId}
        })

        if (deleted) {
          response = new ResponseHelper('success delete all carts!', null)
          return res.status(200).json(response)
        }
      } else {
        deleted = await Cart.destroy({
          where: { id: cartId }
        })

        if (deleted) {
          response = new ResponseHelper(`success delete cart with id: ${cartId}`, null)
          return res.status(200).json(response)
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController