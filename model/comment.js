'use strict';

const debug = require('debug')('noteapp:note');
const storage = require('../lib/storage.js');
const createError = require('http-errors');
const uuidV1 = require('node-uuid').v1;

const Comment = module.exports = function(opts){
  debug('comment constructor');
  this.announcer = opts.announcer;
  this.comment = opts.comment;
  this.year= opts.year;
  this.id = uuidV1();
};

Comment.fetchAll = function(){
  debug('fetchAll');
  return storage.availIDs('comments');
};

Comment.findById = function(id){
  debug('findById');
  return storage.fetchItem('comments', id);
};

Comment.deleteById = function(id){
  debug('deleteById');
  return storage.deleteItem('comments', id);
};

Comment.prototype.save = function(){
  debug('comment.save()');
  if(!this.announcer || !this.comment || this.week)
    return Promise.reject(createError(400, 'expected title and content'));
  return storage.createItem('comments', this);
};
