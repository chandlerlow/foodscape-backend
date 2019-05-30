const bananas = {
  name: 'Bananas',
  photo: 'https://tinyurl.com/y23wzpyo',
  quantity: '1 bunch',
  expiry_date: new Date('June 2 2019 00:00'),
  description: 'A perfectly good bunch of bananas!',
  user_id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('Items', [bananas], {}),

  down: (queryInterface, Sequelize) => queryInterface
    .bulkDelete('Items', null, {}),

};
