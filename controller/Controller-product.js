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

    // static createNew (req, res, next) {

    // }

    // static editOne (req, res, next) {

    // }

    // static deleteOne (req, res, next) {

    // }

}

module.exports = ControllerProduct