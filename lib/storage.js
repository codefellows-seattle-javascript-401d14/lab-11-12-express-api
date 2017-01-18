'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('thundercatapp:storage'); //TODO double check this thing for possible errors
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const mkdirp = Promise.promisifyAll(require('mkdirp'));


const storage = module.exports = {};

storage.createItem = function(schemaName, item){
  debug('createItem()');
  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!item) return Promise.reject(createError(400, 'expected item'));
  if(!item.id) return Promise.reject(createError(400, 'expected item to have an id'));

  let json = JSON.stringify(item);
  let path = `${__dirname}/../data/${schemaName}`;
  return fs.accessProm(path)
  .catch(err => {
    if (err.code === 'ENOENT')
      return mkdirp.mkdirpAsync(path);
    else
        return Promise.reject(err);
  })
  .then(() => fs.writeFileProm(`${path}/${item.id}.json`, json))
  .then(() => item);
};

storage.fetchItem = function(schemaName, id) {
  debug('fetchItem()');
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected item id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(data => {
    let item = JSON.parse(data.toString());
    return item;
  });
};

storage.deleteItem = function(schemaName, id) {
  debug('deleteItem()');
  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!id) return Promise.reject(createError(400, 'expected item id'));
  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(createError(404, err.message)));
};

storage.availIDs = function(schemaName) {
  debug('availIDs()');
  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( filenames => filenames.map(name => name.split('.json')[0]));
};
















// storage.setItem = function(name, item){
//    // TODO: check if directory exits
//
//   return fs.statAsync(`${dataDir}/${name}`)
// .catch(err => {
//   err.status = 400;
//   return Promise.reject(err);
// })
// .then(() => {
//   let json = JSON.stringify(item);
//
//   return fs.writeFileAsync(`${dataDir}/${name}/${item.id}.json`, json);
// })
// .then(() => item);
//
//   // Old code :P
//   // if (!data[name]) data[name] = {};
//   // data[name][item.id] = item;
//   // return Promise.resolve(item);
// };
//
// storage.getItem = function(name, id){
//   // TODO check if name dir xists if not 404
//   // TODO check if JSON file with id name exists if not 404
//   // TODO: read json file parse and send back
//
//   return fs.statAsync(`${dataDir}/${name}/${id}.json`)
//   .catch(err => {
//     err.status = 404;
//     return Promise.reject(err);
//   })
// .then(() => {
//   return fs.readFileAsync(`${dataDir}/${name}/${id}.json`);
// })
// .then(data => {
//   return JSON.parse(data.toString());
// });
// };
//
// storage.deleteItem = function(name, id){
//   // TODO: use fs.statAsync to check if file exts
// // if not in catch blcok make the error a 404 and reject it
//   // if (!data[name] || !data[name][id]) {
//   //   let err = new Error('item not found');
//   //   err.status = 404;
//   //   return Promise.reject(err);
//   // }
//   //
//   // delete data[name][id];
//   // return Promise.resolve();
//
//   return fs.statAsync(`${dataDir}/${name}/${id}.json`)
//   .catch(err => {
//     err.status = 404;
//     return Promise.reject(err);
//   })
//   .then(() => {
//     return fs.unlinkAsync(`${dataDir}/${name}/${id}.json`);
//   })
//   .then(() => {
//     return Promise.resolve();
//   });
//
//
//
// };
//
// //zzzzzzzz
