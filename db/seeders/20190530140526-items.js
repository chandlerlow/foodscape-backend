const moment = require('moment');

const bobBananas = {
  name: 'Bananas',
  photo: 'default.jpg',
  quantity: '1 bunch',
  expiry_date: moment().add(3, 'days').toDate(),
  description: 'A perfectly good bunch of bananas!',
  is_collected: false,
  user_id: 2,
  category_id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert('Items', [bobBananas], {}),

  down: queryInterface => queryInterface
    .bulkDelete('Items', null, {}),

};
