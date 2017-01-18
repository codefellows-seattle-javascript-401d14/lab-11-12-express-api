'use strict';

require('dotenv').load();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('pokeapp:server');

const pokemonRouter = require('./route/pokemon-router.js');
const app = express();


app.use(cors());
app.use(morgan('dev'));

app.use(pokemonRouter);
app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);
  if(err.status){
    res.status(err.status).send();
    return;
  }
  res.status(500).send();
});

app.listen(process.env.PORT, () => {
  debug('Starting server');
  console.log('SERVER UP: Lets start catching pokemon', process.env.PORT);
});
