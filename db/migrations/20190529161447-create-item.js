module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Items', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.STRING,
    },
    expiry_date: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.STRING,
    },
    user_id: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Items'),
};
