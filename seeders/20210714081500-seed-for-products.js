'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Apel Malang',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/apelmalang.png',
        price: 5000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Blueberry',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/blueberry.png',
        price: 30000,
        stock: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pisang Cavendish',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/pisang.jpeg',
        price: 25000,
        stock: 87,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
