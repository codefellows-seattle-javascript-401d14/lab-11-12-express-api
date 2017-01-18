'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const thundercatRouter = module.exports = new Router;
const debug = require('debug')('thundercatapp:thundercat-router');

const Thundercat = require('../model/thundercat.js');



thundercatRouter.post('/api/thundercats',jsonParser, function(req, res, next) {
  debug('POST /api/thundercats');
  new Thundercat(req.body).save()
  .then(thundercat => res.json(thundercat))
  .catch(err => next(err));
});

thundercatRouter.get('/api/thundercats/:id', function(req, res, next){
  debug('GET /api/thundercats/:id');
  Thundercat.findById(req.params.id)
  .then(thundercat => res.json(thundercat))
  .catch(next);
});

thundercatRouter.get('/api/thundercats', function(req, res, next){
  debug('GET /api/thundercats');
  Thundercat.fetchAll()
  .then(ThundercatIds => res.json(ThundercatIds))
  .catch(next);
});

thundercatRouter.delete('/api/thundercats', function(req, res, next){
  debug('DELETE /api/thundercats');
  Thundercat.deleteById(req.params.id)
  .catch(next);
});
