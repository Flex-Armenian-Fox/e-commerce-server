'use strict';

const { query } = require("express");
const {hashPassword} = require('../helpers/bcrypt.js')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin1@email.com',
        password: hashPassword('admin1'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user1@email.com',
        password: hashPassword('user1'),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@email.com',
        password: hashPassword('user2'),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    
  }
};
