module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Items',
    'is_collected',
    {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'Items',
    'is_collected',
  ),
};
