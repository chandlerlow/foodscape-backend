'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    phone_no: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Item, {
      foreignKey: 'user_id'
    });
  };
  return User;
};
