module.exports = (sequelize) => {
  const UserInterests = sequelize.define('UserInterests', {
  }, {});
  // Uncomment to add associations
  // UserInterests.associate = (models) => {};
  return UserInterests;
};
