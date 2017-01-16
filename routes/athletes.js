'use strict';

const express = require('express');
const Router = express.Router();
const jsonParser = require('body-parser').json();
const athletes = new Router();

const Athlete = require('../model/Athlete');

athletes.post('/api/athletes', jsonParser, function(req, res, next) {
  new Athlete(req.body).save()
  .then(athlete => res.json(athlete))
  .catch(next);
});
athletes.get('/api/athletes/:id', (req, res, next) => {
  Athlete.fetchItem(req.params.id)
  .then(athlete => res.json(athlete))
  .catch(next);
});
athletes.get('/api/athletes', (req, res, next) => {
  Athlete.availIDs()
  .then(athletes => res.json(athletes))
  .catch(next);
});
athletes.delete('/api/athletes/:id', (req, res, next) => {
  Athlete.deleteItem(req.params.id)
  .then(athlete => res.json(athlete))
  .catch(next);
});

module.exports = athletes;
