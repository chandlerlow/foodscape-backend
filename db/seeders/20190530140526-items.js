const moment = require('moment');

const bobBananas = {
  name: 'Bananas',
  photo: 'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA2NS8xNDkvb3JpZ2luYWwvYmFuYW5hcy5qcGc=',
  quantity: '1 bunch',
  expiry_date: moment().add(3, 'days').toDate(),
  description: 'A perfectly good bunch of bananas!',
  user_id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('Items', [bobBananas], {}),

  down: (queryInterface, Sequelize) => queryInterface
    .bulkDelete('Items', null, {}),

};
