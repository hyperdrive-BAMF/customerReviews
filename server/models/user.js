'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    avatar_url: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: 'AuthorId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};