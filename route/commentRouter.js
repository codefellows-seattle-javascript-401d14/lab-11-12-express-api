'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const commentRouter = module.exports = new Router();

const Comment = require('../model/comment.js');

commentRouter.post('/api/comments', jsonParser, function(req, res, next){
  new Comment(req.body).save()
  .then(comment => res.json(comment))
  .catch(next);
});

commentRouter.get('/api/comments/:id', function(req, res, next){
  Comment.findById(req.params.id)
  .then(comment => res.json(comment))
  .catch(next);
})

commentRouter.get('/api/comments', function(req, res, next){
  Comment.fetchAll()
  .then(commentIds => res.json(commentIds))
  .catch(next);
})
