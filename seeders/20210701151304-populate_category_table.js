'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      {
        category_name: 'Sports Bike',
        category_description: 'This sports bike just for real man!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_name: 'Naked Bike',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_name: 'Advanture Bike',
        category_description: 'For you who loves adventure',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Categories', categories, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
