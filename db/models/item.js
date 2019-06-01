module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Item.associate = function (models) {
    // associations can be defined here
    Item.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Item;
};
