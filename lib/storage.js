'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('pokeapp:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const mkdirp = Promise.promisifyAll(require('mkdirp'));
const storage = module.exports = {};

storage.createItem = function(schemaName, item){
  debug('createItem()');
  if(schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!item) return Promise.reject(createError(400, 'expected item'));
  if(!item.id) return Promise.reject(createError(400, 'expected item to have an id'));

  let json = JSON.stringify(item);
  let path = `${__dirname}/../data/${schemaName}`;
  return fs.accessProm(path)
  .catch(err => {
    if(err.code === 'ENOENT')
      return mkdirp.mkdirpAsync(path);
    else
      return Promise.reject(err);
  })
    .then(() => fs.writeFileProm(`${path}/${item.id}.json`, json))
    .then(() => item);
};

storage.fetchItem = function(schemaName, id){
  debug('fetchItem()');
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected item ID'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(data => {
    let item = JSON.parse(data.toString());
    return item;
  });
};

storage.deleteItem = function(schemaName, id){
  debug('deleteItem()');
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected item'));
  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(createError(404, err.message)));
};

storage.availIDs = function(schemaName) {
  debug('availIDs()');
  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( filenames => filenames.map(name => name.split('.json')[0]));
};
