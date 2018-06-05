var express = require('express');
var router = express.Router();

//    _____ __________.___  __________               __                 
//   /  _  \\______   \   | \______   \ ____  __ ___/  |_  ____   ______
//  /  /_\  \|     ___/   |  |       _//  _ \|  |  \   __\/ __ \ /  ___/
// /    |    \    |   |   |  |    |   (  <_> )  |  /|  | \  ___/ \___ \ 
// \____|__  /____|   |___|  |____|_  /\____/|____/ |__|  \___  >____  >
//         \/                       \/                        \/     \/ 
// Common Route Params:
//   - gameId: Primary Key of a Vapor Game in our system

router.get('/game/:gameId', (req, res) => {
  res.json({
    message: "The primary /game/:gameId endpoint is returning data.",
    gameId: req.params.gameId    
  })
});

router.get('/game/:gameId/reviews/', (req, res) => {
  res.json({
    message: "The primary /game/:gameId/reviews/ endpoint is returning data.",
    gameId: req.params.gameId
  });
});

router.get('/game/:gameId/reviews/summary', (req, res) => {
  res.json({
    message: "The primary /game/:gameId/reviews/ endpoint is returning data.",
    gameId: req.params.gameId
  });
});

module.exports = router;
