const bob = {
  name: 'Bob Pintos',
  location: 'Block C',
  phone_no: '07831946183',
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('Users', [bob], {}),

  down: (queryInterface, Sequelize) => queryInterface
    .bulkDelete('Users', null, {}),

};
