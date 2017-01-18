'use strict';

const uuidv1 = require('node-uuid').v1;
const createError = require('http-errors');
const storage = require('../lib/storage.js');
const debug = require('debug')('thundercatapp:thundercat'); //TODO doublecheck this thingy

const Thundercat = module.exports = function (opts){ //TODO new constructor thundercat added for handling changes
  debug('eye of thundera constructor');
  this.name = opts.name;
  this.origin = opts.origin;
  this.id = uuidv1();
  this.group = opts.group;
};

Thundercat.fetchAll = function(){
  debug('fetchAll');
  return storage.availIDs('thundercat');
};

Thundercat.findById = function(id){
  debug('findById');
  return storage.fetchItem('thundercat', id);
};

Thundercat.deleteById = function(id){
  debug('deleteById');
  return storage.deleteItem('thundercat', id);
};

Thundercat.prototype.save = function() {
  debug('thundercat.save()');
  if(!this.name || !this.origin || !this.id || !this.group)
    return Promise.reject(createError(400, 'expected name and info :P'));
  return storage.createItem('thundercat', this);
};
