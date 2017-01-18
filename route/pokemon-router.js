'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const pokemonRouter = module.exports = new Router();
const debug = require('debug')('pokeapp:pokemon-router');

const Pokemon = require('../model/pokemon.js');

pokemonRouter.post('/api/pokemon', jsonParser, function(req, res, next){
  debug('Post /api/pokemon');
  new Pokemon(req.body).save()
  .then(pokemon => res.json(pokemon))
  .catch(next);
});

pokemonRouter.get('/api/pokemon/:id', function(req, res, next){
  debug('Get /api/pokemon/:id');
  Pokemon.findById(req.params.id)
  .then(pokemon => res.json(pokemon))
  .catch(next);
});

pokemonRouter.get('/api/pokemon', function(req, res, next){
  debug('Get /api/pokemon');
  Pokemon.fetchAll()
  .then(pokemonIds => res.json(pokemonIds))
  .catch(next);
});
