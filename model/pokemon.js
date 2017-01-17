'use strict';

const storage = require('../lib/storage.js');
const createError = require('http-errors');
const uuidV1 = require('node-uuid').v1;
const Pokemon = module.exports = function(opts){
  this.name = opts.name;
  this.type = opts.type;
  this.pokedexNUM = opts.pokedexNUM;
  this.moves = opts.moves;
  this.id = uuidV1();
};

Pokemon.fetchAll = function(){
  return storage.availIDs('pokemon');
};

Pokemon.findById = function(id){
  return storage.fetchItem('pokemon', id);
};

Pokemon.deleteById = function(id){
  return storage.deleteItem('pokemon', id);
};

Pokemon.prototype.save = function(){
  if(!this.name || !this.type || !this.pokedexNUM)
    return Promise.reject(createError(400, 'expected the name, type and pokedex number'));
  return storage.createItem('pokemon', this);
};
