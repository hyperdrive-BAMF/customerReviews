const express = require('express');
const router = express.Router();

const models = require('./../models');
//    _____ __________.___  __________               __                 
//   /  _  \\______   \   | \______   \ ____  __ ___/  |_  ____   ______
//  /  /_\  \|     ___/   |  |       _//  _ \|  |  \   __\/ __ \ /  ___/
// /    |    \    |   |   |  |    |   (  <_> )  |  /|  | \  ___/ \___ \ 
// \____|__  /____|   |___|  |____|_  /\____/|____/ |__|  \___  >____  >
//         \/                       \/                        \/     \/ 
// Common Route Params:
//   - gameId: Primary Key of a Vapor Game in our system

router.get('/game/all', (req, res) => {
  // Return a JSON response with a list of all games
  models.Game.findAll()
    .then((games) => {
      res.json({
        games
      });
    });
});

router.get('/game/:gameId', (req, res) => {
  // Return a JSON response with the single game record by Id
  models.Game.findOne({ where: { id: req.params.gameId } })
    .then((game) => {
      res.json({
        game
      });
    })
});

router.get('/game/:gameId/reviews/', (req, res) => {
  // Return a JSON response with all reviews for the game by Id,
  // including the 'author' User information as well
  models.Review.findAll({
    include: [
      {
        model: models.Game,
        where: { id: req.params.gameId },
        required: true,
        attributes: [] // Join without selecting any attributes from Game
      },
      {
        model: models.User,
        as: 'author'
      }
    ]
  }).then((reviews) => {
    res.json(reviews);
  });

});

router.get('/game/:gameId/reviews/summary', (req, res) => {
  // Return a JSON response with a summary of reviews by date with a count
  // of how many were positive and how many were negative
  models.Review.findAll({
    attributes: [
      [models.sequelize.fn('date_trunc', 'day', models.sequelize.col('Review.createdAt')), 'date'],
      [models.sequelize.literal('COUNT(CASE WHEN positive = true THEN positive END)'), 'positive'],
      [models.sequelize.literal('COUNT(CASE WHEN positive = false THEN positive END)'), 'negative']
    ],
    group: [models.sequelize.fn('date_trunc', 'day', models.sequelize.col('Review.createdAt'))],
    include: [
      {
        model: models.Game,
        where: { id: req.params.gameId },
        required: true,
        attributes: [] // Join without selecting any attributes from Game
      }
    ]
  }).then((reviewsSummary) => {
    res.json(reviewsSummary);
  });
});

module.exports = router;
