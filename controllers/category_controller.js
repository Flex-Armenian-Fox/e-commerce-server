const ResponseHelper = require('../helpers/response_helper')
const CustomError = require('../middlewares/error_handler')
const { Category } = require('../models')

class Controller {
    static async getCategories(req, res, next) {
        try {
            const categoryId = req.params.id || null
            let response = null

            if (!categoryId) {
                const categories = await Category.findAll({
                    order: [['id', 'asc']]
                })
                response = new ResponseHelper('success', categories)
            } else {
                const category = await Category.findByPk(categoryId)
                if (!category) throw new CustomError('NotFound', `Category with id ${categoryId} was not found`)
                response = new ResponseHelper('success', category)
            }

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async createCategory(req, res, next) {
        try {
            const { category_name, category_description } = req.body
            const newCategory = await Category.create({
                category_name, category_description
            })
            const response = new ResponseHelper('success', newCategory)

            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async updateCategory(req, res, next) {
        try {
            const { category_name, category_description } = req.body
            const categoryId = req.params.id
            const category = await Category.findByPk(categoryId)
            let response = null

            if (!category) throw new CustomError('NotFound', `Category with id ${categoryId} was not found`)

            const updatedCategory = await Category.update({
                category_name, category_description
            }, {
                where: { id: categoryId },
                returning: true
            })

            if (updatedCategory) {
                response = new ResponseHelper('update success', updatedCategory[1])
            }

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const categoryId = req.params.id
            const category = await Category.findByPk(categoryId)
            let response = {}

            if (!category) throw new CustomError('NotFound', `Category with id ${categoryId} was not found`)

            const deletedCategory = await Category.destroy({
                where: { id: categoryId }
            })

            if (deletedCategory) {
                response = new ResponseHelper('category deleted successfully', null)
            }

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller