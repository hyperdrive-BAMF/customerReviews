'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      title: "Greatest Game of All Time",
      content: "Yo Imma let you finish, imma let you finish but Valve had da best game of all time. OF ALL TIME!",
      positive: true,
      gameId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
