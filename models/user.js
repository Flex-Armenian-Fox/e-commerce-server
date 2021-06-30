'use strict';
const {Model} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        isEmail: {
          args: true,
          msg: 'Email must be in an email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: [5, 30],
          msg: 'Password length must be between 5-30 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Role cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Role cannot be empty'
        }
      }
    }
  }, {
    hooks: {
        beforeCreate: (user, options) => {
          let hashedPw = hashPassword(user.password)
          user.password = hashedPw

          if (user.role !== 'admin') user.role = 'customer'
        }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};