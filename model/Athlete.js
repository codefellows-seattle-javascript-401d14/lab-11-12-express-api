'use strict';

const storage = require('../lib/storage');
const createError = require('http-errors');
const debug = require('debug')('athlete:athlete');
const uuid = require('node-uuid').v1;

const Athlete = module.exports = function(opts) {
  debug('athlete contructor');
  this.id = uuid();
  this.athlete_name = opts.athlete_name;
  this.sport = opts.sport;
};
Athlete.fetchAll = function() {
  return storage.availIDs('athletes');
};
Athlete.findById = function(id) {
  return storage.fetchItem('athletes', id);
};
Athlete.deleteById = function(id) {
  return storage.deleteItem('athletes', id);
};
Athlete.prototype.save = function() {
  if(!this.athlete_name || !this.sport)
    return Promise.reject(createError(400, 'expected athlete name and sport'));
  return storage.createItem('athletes', this);
};
