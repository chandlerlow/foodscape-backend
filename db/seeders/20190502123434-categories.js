const noCategory = {
  name: 'No Category',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const fruits = {
  name: 'Fruits',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const veg = {
  name: 'Vegetables',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const meat = {
  name: 'Meat',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const dairyEggs = {
  name: 'Dairy & Eggs',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const cereals = {
  name: 'Cereals',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const confectionery = {
  name: 'Confectionery',
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert('Categories', [noCategory, fruits, veg, meat, dairyEggs, cereals, confectionery], {}),

  down: queryInterface => queryInterface
    .bulkDelete('Categories', null, {}),
};
