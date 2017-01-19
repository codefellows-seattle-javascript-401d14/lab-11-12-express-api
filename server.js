'use strict';
require('dotenv').load();
const express = require('express');
const PORT = process.env.PORT || 3000;
const personRouter = require('./lib/person-router');

let app = express();

app.use(personRouter);

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);
  if(err.status){
    res.status(err.status).send();
    return;
  }
  res.status(500).send();
});

app.listen(PORT, () => {
  console.log('Lab 11/12 Server up!');
});
