const { Transaction, User } = require('../models')

class TransactionController {
  static async getUserTransaction(req, res, next) {
    try {
      const userTransaction = await Transaction.findAll({
        include: {
          model: User,
          as: 'user_transaction',
          attributes: ['id', 'email', 'role']
        },
        where: { user_id: req.currentUser.id }
      })

      return res.status(200).json(userTransaction)
    } catch (error) {
      next(error)
    }
  }

  static async createTransaction(req, res, next) {
    try {
      const data = req.body      
      // res.status(200).send(req.body)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController