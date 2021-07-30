'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = require('./products.json')

    products.forEach(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    })

    await queryInterface.bulkInsert('products', products)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
