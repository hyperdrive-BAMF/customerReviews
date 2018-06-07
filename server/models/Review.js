module.exports = (sequelize, DataTypes) => {
    var Review = sequelize.define('Review', {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      positive: DataTypes.BOOLEAN
    },
    {
      // Each User can only have One Review per Game
      indexes: [
        {
          unique: true,
          fields: ['GameId', 'AuthorId']
        }
      ]
    }
  );
  Review.associate = (models) => {
    Review.belongsTo(models.Game, {
      foreignKey: 'gameId',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.User, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
