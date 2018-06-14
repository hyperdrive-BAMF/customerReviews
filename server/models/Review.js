module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review', {
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
      as: 'author',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
