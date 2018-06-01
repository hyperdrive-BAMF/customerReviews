'use strict';
module.exports = (sequelize, DataTypes) => {
  var Game = sequelize.define('Game', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Game.associate = (models) => {
    Game.hasMany(models.Review, {
      foreignKey: 'GameId',
      onDelete: 'CASCADE'
    })
  };
  return Game;
};