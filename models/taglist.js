'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Tag, {foreignKey: 'tagId', onDelete: 'CASCADE'})
      this.belongsTo(models.Product, {foreignKey: 'tagId', onDelete: 'CASCADE'})
    }
  };
  TagList.init({
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TagList',
  });
  return TagList;
};