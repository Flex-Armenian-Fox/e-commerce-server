'use strict'

const {Product} = require('../models')

class ControllerProduct {

    static displayAll (req, res, next) {
        console.log('MASUK STATIC DISPLAYALL')

        Product.findAll({order: [['id', 'ASC']]})
            .then(products => {
                console.log('MASUK THEN - displayAll')
                res.status(200).json({products})
            })
            .catch(err => {
                console.log('MASUK CATCH - displayAll')
                next(err)
            })
    }

    static createNew (req, res, next) {
        console.log('MASUK STATIC createNew')

        const input = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.create(input)
            .then(product => {
                console.log('MASUK THEN - createNew')
                console.log(product)
                res.status(201).json({
                    product: product
                })
            })
            .catch(err => {
                console.log('MASUK CATCH - createNew')
                next(err)
            })
    }

    // static editOne (req, res, next) {

    // }

    // static deleteOne (req, res, next) {

    // }

}

module.exports = ControllerProduct