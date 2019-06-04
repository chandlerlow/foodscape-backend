module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    user_id: DataTypes.INTEGER,
    filename: DataTypes.STRING,
  }, {});
  Image.associate = (models) => {
    // associations can be defined here
    Image.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Image;
};
