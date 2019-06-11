module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
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
    is_collected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {});
  Item.associate = (models) => {
    // associations can be defined here
    Item.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Item.belongsTo(models.Category, {
      foreignKey: 'category_id',
    });
    Item.belongsToMany(models.User, {
      as: 'Interested',
      through: 'UserMessages',
      foreignKey: 'user_id',
    });
  };
  return Item;
};
