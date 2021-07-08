'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Product, {through: 'TagList', foreignKey: 'tagId'})
    }
  };
  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: {args: true},
      validate:{
        notNull: {msg: "Tag name may not be empty"},
        notEmpty: {msg: "Tag name may not be empty"}
      }
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};