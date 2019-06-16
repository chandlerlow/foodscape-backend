module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert('UserInterests', [
      {
        user_id: 1,
        item_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        item_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        item_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),

  down: queryInterface => queryInterface
    .bulkDelete('UserInterests', null, {}),
};
