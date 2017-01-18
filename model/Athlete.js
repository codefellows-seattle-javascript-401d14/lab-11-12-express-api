'use strict';

const storage = require('../lib/storage');
const createError = require('http-errors');
const debug = require('debug')('athletesApp: constructor-Athlete');
const uuid = require('node-uuid').v1;

const Athlete = module.exports = function(opts) {
  debug('athlete contructor');
  this.id = uuid();
  this.athleteName = opts.athleteName;
  this.sport = opts.sport;
};
Athlete.fetchAll = function() {
  debug('fetchAll()');
  return storage.availIDs('athletes');
};

Athlete.findById = function(id) {
  debug('findById()');
  return storage.fetchItem('athletes', id);
};

Athlete.deleteById = function(id) {
  debug('deleteById()');
  return storage.deleteItem('athletes', id);
};

Athlete.prototype.save = function() {
  debug('Athlete.prototype.save()');
  if(!this.athleteName || !this.sport)
    return Promise.reject(createError(400, 'expected athleteName and sport'));
  return storage.createItem('athletes', this);
};
