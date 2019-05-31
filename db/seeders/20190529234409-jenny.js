const jenny = {
  name: 'Jenny Xu',
  location: 'Block A',
  phone_no: '07790727425',
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('Users', [jenny], {}),

  down: (queryInterface, Sequelize) => queryInterface
    .bulkDelete('Users', null, {}),

};
