module.exports = (sequelize, DataTypes) => {
  const Metric = sequelize.define('Metric', {
    action: DataTypes.STRING,
    source: DataTypes.STRING,
  }, {});
  Metric.associate = function (models) {
    Metric.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Metric;
};
