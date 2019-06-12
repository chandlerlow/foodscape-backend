module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Metrics',
    'additional',
    {
      type: Sequelize.STRING,
      allowNull: true,
    },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'Metrics',
    'additional',
  ),
};
