'use strict';

var jenny = {
  name: 'Jenny Xu',
  location: 'Block A',
  phone_no: '07790727425'
  createdAt = new Date(),
  updatedAt = new Date()
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add dummy user Jenny
    return queryInterface.bulkInsert('Users', [jenny], {});
  },

  down: (queryInterface, Sequelize) => {
    // Delete user Jenny
    return queryInterface.bulkDelete('Users', jenny, {});
  }
};
