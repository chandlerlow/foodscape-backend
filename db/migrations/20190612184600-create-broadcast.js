module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Broadcasts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    summary: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    message: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Broadcasts'),
};
