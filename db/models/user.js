module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
  }, {});

  User.associate = function (models) {
    User.hasMany(models.Item, {
      foreignKey: 'user_id',
    });
    User.hasMany(models.Image, {
      foreignKey: 'user_id',
    });
  };
  return User;
};
