'use strict'

const {Product} = require('../models')

class ControllerProduct {

    static displayAll (req, res, next) {
        console.log('MASUK STATIC DISPLAYALL')

        Product.findAll({order: [['id', 'ASC']]})
            .then(products => {
                res.status(200).json({products})
            })
            .catch(err => {
                next(err)
            })
    }

    static displayOne (req, res, next) {
        console.log('MASUK STATIC displayOne')

        Product.findOne({where: {id: +req.params.id}})
            .then(product => {
                if (!product) {
                    throw {name: 'Not Found'}
                } else {
                    console.log('INI PRODUCT %%% > ', product)
                    res.status(200).json({product: product})
                }
            })
            .catch(err => {
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
                console.log('INI PRODUCT %%% > ', product)
                res.status(201).json({
                    product: product
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static editOne (req, res, next) {
        console.log('MASUK STATIC editOne')
        const newInput = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(newInput, {
            where: {id: +req.params.id},
            returning: true
        })
            .then(response => {
                if (response[0] === 0) {
                    throw {name: 'Not Found'}
                } else {
                    console.log('INI RESPONSE[1] %%% > ', response[1])
                    res.status(200).json({
                        product: `Product with ID ${req.params.id} has been updated`,
                        updated_product: response[1]
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteOne (req, res, next) {
        console.log('MASUK STATIC deleteOne')
        Product.destroy({where: {id: +req.params.id}})
            .then((response) => {
                if (response !== 1) {
                    throw {name: 'Not Found'}
                } else {
                    res.status(200).json({
                        success: `Product with ID ${req.params.id} has been deleted`
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }

}

module.exports = ControllerProduct