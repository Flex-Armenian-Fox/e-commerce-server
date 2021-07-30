'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "address", {
      type: Sequelize.STRING,
    })

    await queryInterface.addColumn("users", "phone", {
      type: Sequelize.STRING,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "address") 
    await queryInterface.removeColumn("users", "phone") 
  }
};
