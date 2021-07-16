'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Tag, {through: 'TagList', foreignKey: 'productId'})
      this.belongsToMany(models.User, {through: models.Cart, foreignKey: 'ProductId'})
      this.hasMany(models.Cart, {foreignKey: 'ProductId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Product name cannot be empty"},
        notEmpty: {msg: "Product name cannot be empty"},
      } 
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Price cannot be negative"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Stock cannot be negative"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};