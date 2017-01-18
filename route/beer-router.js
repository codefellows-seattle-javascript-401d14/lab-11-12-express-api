'use strict';

const Beer = require('../model/beer.js');
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const beerRouter = module.exports = new Router();

beerRouter.post('/api/beers', jsonParser, function(req, res, next) {
  new Beer(res.body).save()
  .then(beer => res.json(beer))
  .catch(next);
});

beerRouter.get('/api/beers/:id', function(req, res, next) {
  Beer.findByID(req.params.id)
  .then(beer => res.json(beer))
  .catch(next);
});

beerRouter.get('/api/notes', function(req, res, next) {
  Beer.fetchAll()
  .then(beerIds => res.json(beerIds))
  .catch(next);
});
