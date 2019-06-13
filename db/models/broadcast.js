module.exports = (sequelize, DataTypes) => sequelize.define('Broadcast', {
  summary: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  message: {
    allowNull: true,
    type: DataTypes.STRING,
  },
}, {});
