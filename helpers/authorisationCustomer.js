'use strict'

function authorisationCustomer (req, res, next) {

    const userRole = req.currentUser.role

    if (userRole === 'customer') {
        next()
    } else {
        let error = {name: 'Not Authorised', message: 'You must be a customer to shop'}
        next(error)
    }

}

module.exports = authorisationCustomer