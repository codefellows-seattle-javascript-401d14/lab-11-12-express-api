'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const commentRouter = module.exports = new Router();
const debug = require('debug')('commentapp:comment-router');

const Comment = require('../model/comment.js');

commentRouter.post('/api/comments', jsonParser, function(req, res, next){
  debug('POST /api/comments');
  new Comment(req.body).save()
  .then(comment => res.json(comment))
  .catch(err => next(err));
});

commentRouter.get('/api/comments/:id', function(req, res, next){
  debug('GET /api/comments/:id');
  Comment.findById(req.params.id)
  .then(comment => res.json(comment))
  .catch(next);
});

commentRouter.get('/api/comments/getall', function(req, res, next){
  debug('GET /api/comments');
  Comment.fetchAll()
  .then(commentIds => res.json(commentIds))
  .catch(next);
});

commentRouter.delete('/api/comments/:id', function(req, res, next){
  debug('DELETE /api/comments');
  Comment.deleteById(req.params.id)
  .then(comment => res.json(comment))
  .catch(next);
});
