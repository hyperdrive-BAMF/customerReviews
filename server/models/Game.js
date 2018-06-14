module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Game.associate = (models) => {
    Game.hasMany(models.Review, {
      foreignKey: 'gameId',
      onDelete: 'CASCADE'
    });
  };
  return Game;
};
