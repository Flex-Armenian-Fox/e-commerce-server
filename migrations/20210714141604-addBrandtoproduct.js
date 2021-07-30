'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("products", "brand", {
      type: Sequelize.STRING,
    })

    await queryInterface.addColumn("products", "item_code", {
      type: Sequelize.STRING,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("products", "brand") 
    await queryInterface.removeColumn("products", "item_code") 
  }
};
