'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: 'category_id' })
      Product.belongsToMany(models.User, {
        through: models.Transaction, 
        foreignKey: 'product_id' 
      })
      Product.hasMany(models.Transaction, {
        as: 'product_transaction',
        foreignKey: 'product_id'
      })
      Product.hasMany(models.Cart, { foreignKey: 'product_id' })
      Product.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: 'product_id'
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please Provide Product Name'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please Provide Image URL'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true      
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};