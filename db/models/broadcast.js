module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Broadcast', {
    summary: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    message: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {});
};
