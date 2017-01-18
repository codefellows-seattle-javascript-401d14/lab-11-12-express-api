'use strict';

const uuidV1 = require('node-uuid').v1;
const storage = require('../lib/storage.js');
const createError = require('http-errors');


const Beer = module.exports = function(opts) {
  this.name = opts.name;
  this.type = opts.type;
  this.strength = opts.strength;
  this.id = uuidV1();
  this.created = new Date();
};

Beer.fetchAll = function() {
  return storage.availIds('beers');
};

Beer.deleteById = function(id) {
  return storage.deleteItem('beers', id);
};

Beer.findById = function(id) {
  return storage.fetchItem('beers', id);
};

Beer.prototype.save = function() {
  if(!this.name || !this.type || !this.strength)
    return Promise.reject(createError(400, 'expected name, type and strength'));
  return storage.createItem('beers', this);
};
