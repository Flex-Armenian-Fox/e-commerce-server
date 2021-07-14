'use strict'

const { User, Product, Cart } = require('../models')

class ControllerCart {

    static addToCart (req, res, next) {
        let currentStock = 0
        let qtyToDeduct = 0
        let productName = ''

        Product.findOne({where: {id: +req.params.productId}})
            .then(product => {
                console.log(product.name, ' <= addToCart THEN: product')
                if (!product) { // no hay producto
                    throw {
                        name: 'Not Found',
                        message: 'Product not found'
                    }
                } else { // hay producto
                    currentStock = product.stock
                    productName = product.name
                    if (product.stock >= +req.body.quantity) { // cantidad suficiente
                        return Cart.findOne({
                            where: {
                                UserId: +req.currentUser.id,
                                ProductId: +req.params.productId
                            }
                        })
                    } else { // cantidad no suficiente
                        throw {
                            name: 'Conflicted',
                            message: 'Not enough stock'
                        }
                    }
                }
            })
            .then(cart => {
                console.log(cart, ' <= addToCart THEN: cart')
                if (!cart) { // ga ktmu, bikin di sini, masukkan qty dari req.body.quantity
                    qtyToDeduct += req.body.quantity
                    return Cart.create({
                        UserId: +req.currentUser.id,
                        ProductId: +req.params.productId,
                        quantity: req.body.quantity
                    })
                } else { // ketemu, tambahin qty di sini, lalu di-update
                    qtyToDeduct += req.body.quantity
                    return Cart.update(
                        {quantity: +cart.quantity + +req.body.quantity},
                        {where: {
                            UserId: +req.currentUser.id,
                            ProductId: +req.params.productId
                        }}
                    )
                }
            })
            .then(currentCart => {
                console.log(currentCart, ' <= addToCart THEN: currentCart')
                return Product.update(
                    {stock: currentStock - qtyToDeduct},
                    {where: {id: +req.params.productId}}
                )
            })
            .then(finalProduct => {
                console.log(finalProduct, ' <= addToCart THEN: finalProduct')
                res.status(200).json({
                    message: `${+qtyToDeduct} ${productName} added to cart`
                })
            })
            .catch(err => {
                console.log(err, ' <= addToCart CATCH: err')
                next(err)
            })
    }

    static displayAll (req, res, next) {
        
    }

    static editPatch (req, res, next) {

    }

    static editPut (req, res, next) {

    }

    static removeCart (req, res, next) {

    }

}

module.exports = ControllerCart