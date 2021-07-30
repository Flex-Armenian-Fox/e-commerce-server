'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [
      {
        name: 'Ducati',
        image_url: 'https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg',
        price: 15000000,
        stock: 15,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Honda',
        image_url: 'https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg',
        price: 25000000,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kawasaki',
        image_url: 'https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg',
        price: 25000000,
        stock: 11,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Products', products, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
