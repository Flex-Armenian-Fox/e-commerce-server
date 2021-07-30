'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { 
        as: 'transaction_user',
        foreignKey: 'user_id'
      })
      Transaction.belongsTo(models.Product, {
        as: 'transaction_product',
        foreignKey: 'product_id'
      })
    }
  };
  Transaction.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    total_quantity: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: { args: true, msg: 'quantity value must in numeric' },
        min: { args: 1, msg: 'quantity minimum allowed value is 1' }
      }
    },
    total_price: {
      type: DataTypes.DOUBLE,
      validate: {
        isNumeric: { args: true, msg: 'price value must in numeric' },
        min: { args: 1, msg: 'price minimum allowed value is 1' }
      }
    },
    payment_status: {
      type: DataTypes.ENUM({ values: ['awaiting', 'paid', 'cancel'] }),
      validate: {
        isIn: {
          args: [['awaiting', 'paid', 'cancel']],
          msg: 'Value must between awaiting, paid, or cancel'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};