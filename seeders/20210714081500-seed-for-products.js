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
      {
        name: 'Buah Naga',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/buahnaga.jpeg',
        price: 10000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Durian Musang',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/durian.jpeg',
        price: 80000,
        stock: 68,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jeruk Bali',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/jerukbali.png',
        price: 5000,
        stock: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Strawberry',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/strawberry.jpeg',
        price: 100000,
        stock: 81,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Salak',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/salak.jpeg',
        price: 4500,
        stock: 250,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rambutan',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/rambutan.jpeg',
        price: 23000,
        stock: 70,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pepaya Manis',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/pepaya.png',
        price: 18700,
        stock: 91,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nangka',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/nangka.jpeg',
        price: 37000,
        stock: 55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kelengkeng',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/kelengkeng.jpeg',
        price: 55000,
        stock: 176,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kelapa Ijo',
        image_url: 'https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/kelapaijo.png',
        price: 7500,
        stock: 88,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
