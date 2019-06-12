module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Users',
    'is_staff',
    {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'Users',
    'is_staff',
  ),
};
