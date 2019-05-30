'use strict';

var bob = {
  name: 'Bob Pintos',
  location: 'Block C',
  phone_no: '07831946183',
  createdAt: new Date(),
  updatedAt: new Date()
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add dummy user Bob
    return queryInterface.bulkInsert('Users', [bob], {});
  },

  down: (queryInterface, Sequelize) => {
    // Delete user Bob 
    return queryInterface.bulkDelete('Users', null, {});
  }
};
