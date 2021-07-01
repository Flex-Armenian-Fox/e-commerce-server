const ResponseHelper = require('../helpers/response_helper')
const CustomError = require('../middlewares/error_handler')
const { Product, Category } = require('../models')

class Controller {
    static async getProducts(req, res, next) {
        try {
            const productId = req.params.id
            let products = null

            if (!productId) {
                products = await Product.findAll({
                   order: [['id', 'asc']],
                   include: {
                       model: Category,
                       attributes: ['id', 'category_name']
                   }
                })
            } else {
                products = await Product.findByPk(productId, {
                    include: {
                        model: Category,
                        attributes: ['id', 'category_name']
                    }
                })

                if (!products) throw new CustomError('NotFound', `Product with Id ${productId} was not found`)
            }
            const response = new ResponseHelper('success', products)

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async createProduct(req, res, next) {
        try {
            const { name, image_url, price, stock } = req.body
            const newUser = await Product.create({
                name, image_url, price, stock
            })
            const response = new ResponseHelper('success', newUser)

            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const productId = req.params.id
            const product = await Product.findByPk(productId)
            let response = {}

            if (!product) throw new CustomError('NotFound', `Product with id ${productId} was not found`)

            const deletedProduct = await Product.destroy({
                where: { id: productId }
            })

            if (deletedProduct) {
                response = new ResponseHelper('delete success', null)
            }

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const productId = req.params.id
            const { name, image_url, price, stock } = req.body
            const product = await Product.findByPk(productId)
            let response = {}

            if (!product) throw new CustomError('NotFound', `Product with id ${productId} was not found`)

            const updatedProduct = await Product.update({
                name, image_url, price, stock
            }, {
                where: { id: productId },
                returning: true
            })

            if (updatedProduct) {
                response = new ResponseHelper('update success', updatedProduct[1])
            }

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller