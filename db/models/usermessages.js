module.exports = (sequelize, DataTypes) => {
  const UserMessages = sequelize.define('UserMessages', {
  }, {});
  UserMessages.associate = function (models) {};
  return UserMessages;
};
