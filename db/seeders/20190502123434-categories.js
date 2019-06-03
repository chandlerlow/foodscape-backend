const no_category = {
  name: "No Category",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const fruits = {
  name: "Fruits",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const veg = {
  name: "Vegetables",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const meat = {
  name: "Meat",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const dairy_eggs = {
  name: "Dairy & Eggs",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const cereals = {
  name: "Cereals",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const confectionery = {
  name: "Confectionery",
  createdAt: new Date(),
  updatedAt: new Date(),
}

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('Categories', [no_category, fruits, veg, meat, dairy_eggs, cereals, confectionery], {}),

  down: (queryInterface, Sequelize) => queryInterface
    .bulkDelete('Categories', null, {}),
};
