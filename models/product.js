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
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Product name cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Product name cannot be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Image URL cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Image URL cannot be empty'
        },
        isUrl: {
          args: true,
          msg: 'Image must be in an URL format'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Price cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Price must be a number'
        },
        min: {
          args: 500,
          msg: 'Price cannot be less than 500'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Stock cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'Stock must be an integer'
        },
        min: {
          args: 0,
          msg: 'Stock cannot be less than 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};