const moment = require('moment');

const bobsBananas = {
  name: 'Bananas',
  photo: 'bananas.png',
  quantity: '1 bunch',
  expiry_date: moment().add(1, 'days').toDate(),
  description: 'A ripe bunch of bananas!',
  is_collected: false,
  user_id: 2,
  category_id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const charliesSteak = {
  name: 'Beef Steak',
  photo: 'steak.png',
  quantity: '1 fillet',
  expiry_date: moment().add(3, 'days').toDate(),
  description: 'Extra mature beef steak',
  is_collected: false,
  user_id: 3,
  category_id: 4,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const danielsChocolate = {
  name: 'Galaxy Bar',
  photo: 'galaxy.jpg',
  quantity: '1 bar',
  expiry_date: moment().add(7, 'days').toDate(),
  description: 'A galaxy bar',
  is_collected: false,
  user_id: 4,
  category_id: 7,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert('Items', [bobsBananas, charliesSteak, danielsChocolate], {}),

  down: queryInterface => queryInterface
    .bulkDelete('Items', null, {}),

};
