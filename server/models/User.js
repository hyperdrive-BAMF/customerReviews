module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    avatar_url: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
