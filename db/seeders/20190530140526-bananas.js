'use strict';

var bananas = {
  name: 'Bananas',
  photo: 'https://tinyurl.com/y23wzpyo',
  quantity: '1 bunch',
  expiry_date: new Date("June 2 2019 00:00"), 
  description: 'A perfectly good bunch of bananas!',
  createdAt: new Date(),
  updatedAt: new Date()
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add dummy bananas item
    return queryInterface.bulkInsert('Items', [bananas], {});
  },

  down: (queryInterface, Sequelize) => {
    // Delete bananas item
    return queryInterface.bulkDelete('Items', null, {});
  }
};
