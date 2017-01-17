;'use strict';

const storage = require('../lib/storage.js');
const createError = require('http-errors');
const uuidV1 = require('node-uuid').v1;
const Comment = module.exports = function(opts){
  this.announcer = opts.announcer;
  this.comment = opts.comment;
  this.week = opts.week;
  this.id = uuidV1();
}

Comment.fetchAll = function(){
  return.storage.availIDs('comments');
}

Comment.findById = function(id){
  return storage.fetchItem('comments', id);
}

Comment.deleteById = function(id){
  return storage.deleteItem('comments', id);
}

Comment.prototype.save = function(){
  if(!this.announcer || !this.comment || this.week)
    return Promise.reject(createError(400, 'expected title and content'));
  return storage.createItem('comments', this);
}
