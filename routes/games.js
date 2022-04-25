var express = require('express');
var router = express.Router();
var GamesService = require('../service/gamesService')
var Game = require('../models/game');
const Logger = require('../util/logger');


router.get('/', function(req, res, next) {

    var service = new GamesService()
    service.getAllGames((games) =>  {
      res.json(games)
    })
});

router.get('/:id', (req, res, next) => {
  var id = req.params['id'];
  var service = new GamesService()
  service.getGameById((game) =>{
    res.json(game) 
  }, id)
})

router.post('/', (req, res, next) => {
  Logger.debug('entering post function')
  var game = new Game(req.body);
  Logger.debug(`Game Id: ${game.id}`);
  var service = new GamesService()
  service.createGame((wasSuccessful) => {
    wasSuccessful?res.json('Success'):res.json('Error')
  }, game)
})

router.delete('/:id', (req, res, next) => {
  var id = req.params['id'];
  var service = new GamesService()
    service.deleteGameById((wasSuccessful) => {
      wasSuccessful?res.json('Success'):res.json('Error')
    }, id)
})
module.exports = router;