'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Vitaminized',
      avatar_url: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b1/b1b6162f81df214ac9eaa1526df0dd907cbd066b_full.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
