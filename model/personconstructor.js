'use strict';

const uuidV4 = require('uuid/v4');
const storage = require('../lib/storage.js');
const createError = require('http-errors');


const Person = module.exports = function(person){
  this.id = uuidV4();
  this.name = person.name;
  this.hobby = person.hobby;
};

// Static methods
Person.fetchAll = function(){
  return storage.availIDs('person');
};

Person.findById = function(id){
  return storage.fetchItem('person', id);
};

Person.deleteById = function(id){
  return storage.deleteItem('person', id);
};

// instance methods
Person.prototype.save = function(){
  if(!this.name || !this.hobby)
    return Promise.reject(createError(400, 'expected name and hobby'));
  return storage.createItem('person', this);
};
