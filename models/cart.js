'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: 'user_id' })
      Cart.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
  };
  Cart.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    total_quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: 'Minimum quantity 1' }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};