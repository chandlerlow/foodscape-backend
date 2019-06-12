module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Metrics', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    action: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    source: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Metrics'),
};
