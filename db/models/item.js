'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    photo: DataTypes.BLOB,
    quantity: DataTypes.INTEGER,
    expiry_date: DataTypes.DATE,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};