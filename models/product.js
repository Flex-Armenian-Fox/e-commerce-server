'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.category, {foreignKey: "categoryid"})
      product.hasMany(models.cart, {foreignKey: "productid"})
    }
  };
  product.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    categoryid: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    item_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};