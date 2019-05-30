'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    quantity: DataTypes.STRING,
    expiry_date: DataTypes.DATE,
    description: DataTypes.STRING,
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Item;
};
