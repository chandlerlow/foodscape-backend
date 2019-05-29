'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    photo: DataTypes.BLOB,
    quantity: DataTypes.INTEGER,
    expiry_date: DataTypes.DATE,
    description: DataTypes.STRING,
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(User);
  };
  return Item;
};
