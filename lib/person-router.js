'use strict';

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const personRouter = module.exports = new Router();
const Person = require('../model/personconstructor.js');
const createError = require('http-errors');


///***********************POST(CREATE)***********************************
// POSTS ---> create, .save, .then., .catch

personRouter.post('/api/person', jsonParser, function (req, res , next) {
  new Person(req.body).save()
  .then(person => res.json(person))
  .catch(next);
});
//****************GET *************
personRouter.get('/api/person/:id', function (req, res, next){
  Person.findById(req.params.id)
  .then(person => res.json(person))
  .catch(err => next(createError(404, err.message)));
});
