'use strict'

const {Cart} = require("../models")

function authCustomerGeneral (req, res, next) {

    const userRole = req.currentUser.role

    if (userRole === 'customer') {
        next()
    } else {
        let error = {name: 'Not Authorised', message: 'You must be a customer to shop'}
        next(error)
    }

}

function authCustomerActions (req, res, next) {

    Cart.findByPk(+req.params.cartId)
        .then(cart => {
            if (!cart) {
                throw {
                    name: 'Not Found',
                    message: 'Cart not found'
                }
            } else {
                if (cart.UserId !== req.currentUser.id) {
                    throw {
                        name: 'Not Authorised',
                        message: 'You do not have permission'
                    }
                } else {
                    next()
                }
            }
        })
        .catch(err => {
            next(err)
        })

}

module.exports = {authCustomerGeneral, authCustomerActions}