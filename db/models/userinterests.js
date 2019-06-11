module.exports = (sequelize, DataTypes) => {
  const UserInterests = sequelize.define('UserInterests', {
  }, {});
  UserInterests.associate = function (models) {};
  return UserInterests;
};
