'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = require('./users.json')
    const {hashPassword} = require("../helpers/bcrypt");

    users.forEach(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
      e.password = hashPassword(e.password);
    })

    await queryInterface.bulkInsert('users', users)
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
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
