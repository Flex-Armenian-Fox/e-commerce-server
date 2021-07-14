'use strict'

function authorisationAdmin (req, res, next) {
    
    const userRole = req.currentUser.role

    if (userRole === 'admin') {
        next()
    } else {
        let error = {name: 'Not Authorised'}
        next(error)
    }
}

module.exports = authorisationAdmin