'use strict';

const Router = require('express').Router;
const parseJSON = require('body-parser').json();
const gameRouter = module.exports = new Router();
const debug = require('debug')('gameapp:game-router');

const Game = require('../model/game.js');

gameRouter.post('/api/games', parseJSON, function(req, res, next) {
  debug('POST /api/games');
  new Game(req.body).save()
  .then(game => res.json(game))
  .catch(next);
});

gameRouter.get('/api/games/:id', function(req, res, next) {
  debug('GET /api/games/:id');
  Game.findById(req.params.id)
  .then(game => res.json(game))
  .catch(next);
});

gameRouter.get('/api/games', function(req, res, next) {
  debug('GET /api/games');
  Game.fetchAll()
  .then(gameIDs => res.json(gameIDs))
  .catch(next);
});

gameRouter.delete('/api/games/:id', function(req, res, next) {
  debug('DELETE /api/games/:id');
  Game.deleteById(req.params.id)
  .then(deleteResponse => {
    res.statusCode = 204;
    res.json(deleteResponse);
  })
  .catch(next);
});
