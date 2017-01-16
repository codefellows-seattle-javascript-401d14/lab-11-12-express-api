'use strict';

const Router = require('express').Router;
const parseJSON = require('body-parser').json();
const gameRouter = module.exports = new Router();

const Game = require('../model/game.js');

gameRouter.post('/api/games', parseJSON, function(req, res, next) {
  new Game(req.body).save()
  .then(game => res.json(game))
  .catch(next);
});

gameRouter.get('/api/games/:id', function(req, res, next) {
  Game.findById(req.params.id)
  .then(game => res.json(game))
  .catch(next);
});

gameRouter.get('/api/games', function(req, res, next) {
  Game.fetchAll()
  .then(noteIDs => res.json(noteIDs))
  .catch(next);
});
