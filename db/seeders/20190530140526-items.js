const moment = require('moment');

const bobBananas = {
  name: 'Bananas',
  photo: 'default.jpg',
  quantity: '1 bunch',
  expiry_date: moment().add(3, 'days').toDate(),
  description: 'A perfectly good bunch of bananas!',
  user_id: 2,
  category_id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('Items', [bobBananas], {}),

  down: (queryInterface, Sequelize) => queryInterface
    .bulkDelete('Items', null, {}),

};
