'use strict';

const storage = require('../lib/storage.js');
const createError = require('http-errors');
const uuid = require('node-uuid');

const Game = module.exports = function(obj) {
  this.id = uuid.v1();
  this.title = obj.title;
  this.genre = obj.genre;
  this.developer = obj.developer;
  this.publisher = obj.publisher;
  this.platforms = obj.platforms;
  this.ratingESRB = obj.ratingESRB;
  this.releaseDate = obj.releaseDate;
};

// Static methods
Game.fetchAll = function() {
  return storage.availableIDs('games');
};

Game.findById = function(id) {
  return storage.readItem('games', id);
};

Game.deleteById = function(id) {
  return storage.deleteItem('games', id);
};

// instance methods
Game.prototype.save = function() {
  if(!this.title || !this.genre || !this.developer)
    return Promise.reject(createError(400, 'expected at least title, genre, and developer'));
  return storage.createItem('games', this);
};
