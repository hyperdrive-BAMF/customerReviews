var express = require('express');
var router = express.Router();

// The following is temporary, the DB will be hooked up later
const dummyPrimaryReviewData = require("./../dummyPrimaryReviewData.json");
const dummySummaryReviewData = require("./../dummySummaryReviewData.json");

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
  res.json(dummyPrimaryReviewData);
});

router.get('/game/:gameId/reviews/summary', (req, res) => {
  res.json(dummySummaryReviewData);
});

module.exports = router;
