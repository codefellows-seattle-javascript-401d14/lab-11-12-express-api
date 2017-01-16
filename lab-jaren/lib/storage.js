'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('game:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = Promise.promisifyAll(require('mkdirp'));

const storage = module.exports = {};
const dataDir = `${__dirname}/../data`;

// create item
// will reject a 400 error if there is no schema or item
storage.createItem = function(schema, item) {
  debug('createItem()');
  if (!schema) return Promise.reject(createError(400, 'expected schema'));
  if (!item) return Promise.reject(createError(400, 'expected item'));
  if (!item.id) return Promise.reject(createError(400, 'expected item to have an ID'));

  let json = JSON.stringify(item);
  return fs.accessProm(`${dataDir}/${schema}`)
  .catch(err => {
    if (err.code === 'ENOENT')
      return mkdirp.mkdirpAsync(`${dataDir}/${schema}`);
    else
      return Promise.reject(err);
  })
  .then(() => fs.writeFileProm(`${dataDir}/${schema}/${item.id}.json`, json))
  .then(() => item);
};

storage.readItem = function(schema, id) {
  debug('readItem()');
  if (!schema) return Promise.reject(createError(400, 'expected schema'));
  if (!id) return Promise.reject(createError(400, 'expected item ID'));

  return fs.readFileProm(`${dataDir}/${schema}/${id}.json`)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(data => {
    let item = JSON.parse(data.toString());
    return item;
  });
};

storage.deleteItem = function(schema, id) {
  debug('deleteItem()');
  if (!schema) return Promise.reject(createError(400, 'expected schema'));
  if (!id) return Promise.reject(createError(400, 'expected item ID'));
  return fs.unlinkProm(`${dataDir}/${schema}/${id}.json`)
  .catch(err => Promise.reject(createError(404, err.message)));
};

storage.availableIDs = function(schema) {
  debug('availableIDs()');
  return fs.readdirProm(`${dataDir}/${schema}`)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(filenames => filenames.map(name => name.split('.json')[0]));
};
