'use strict';

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const personRouter = module.exports = new Router();
const Person = require('../model/personconstructor.js');


///***********************POST(CREATE)***********************************
// POSTS ---> create, .save, .then., .catch

personRouter.post('/api/person', jsonParser, function (req, res , next) {
  new Person(req.body).save()
  .then(person => res.json(person))
  .catch(next);
});
