'use strict';

const Router = require('express').Router;
const debug = require('debug')('athletesApp: routes-athletes');
const jsonParser = require('body-parser').json();
const appRouter = module.exports = new Router();

const Athlete = require('../model/Athlete');

appRouter.post('/api/athletes', jsonParser, function(req, res, next) {
  debug('POST /api/athletes');
  new Athlete(req.body).save()
  .then(athletes => res.json(athletes))
  .catch(next);
});
appRouter.get('/api/athletes/:id', function(req, res, next) {
  debug('GET /api/athletes/:id');
  Athlete.findById(req.params.id)
  .then(athletes => res.json(athletes))
  .catch(next);
});
appRouter.get('/api/athletes', (req, res, next) => {
  debug('GET /api/athletes/');
  Athlete.fetchAll()
  .then(athletes => res.json(athletes))
  .catch(next);
});
appRouter.delete('/api/athletes/:id', (req, res, next) => {
  debug('DELETE /api/athletes/:id');
  Athlete.deleteById(req.params.id)
  .then(athletes => res.json(athletes))
  .catch(next);
});
