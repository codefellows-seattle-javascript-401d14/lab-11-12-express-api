'use strict';

const storage = require('../lib/storage.js');
const createError = require('http-errors');
const uuidV1 = require('node-uuid').v1;
const debug = require('debug')('pokeapp:pokemon');
const Pokemon = module.exports = function(opts){
  debug('pokemon constructor');
  this.name = opts.name;
  this.type = opts.type;
  this.pokedexNUM = opts.pokedexNUM;
  this.moves = opts.moves;
  this.id = uuidV1();
};

Pokemon.fetchAll = function(){
  debug('fetchAll');
  return storage.availIDs('pokemon');
};

Pokemon.findById = function(id){
  debug('findById');
  return storage.fetchItem('pokemon', id);
};

Pokemon.deleteById = function(id){
  debug('deleteById');
  return storage.deleteItem('pokemon', id);
};

Pokemon.prototype.save = function(){
  debug('pokemon.save');
  if(!this.name || !this.type || !this.pokedexNUM)
    return Promise.reject(createError(400, 'expected the name, type and pokedex number'));
  return storage.createItem('pokemon', this);
};
