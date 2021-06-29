'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeCreate: (u, opt) => {
        const hashedPassword = hashPassword(u.password);
        u.password = hashedPassword;
      }
    }
  });
  return user;
};