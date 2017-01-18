'use strict';

require('dotenv').load();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('gameapp:server');

const gameRouter = require('./lib/game-router.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));

app.use(gameRouter);

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);
  if(err.status){
    res.status(err.status).send();
    return;
  }
  res.status(500).send();
});

app.listen(PORT, () => {
  debug('starting server');
  console.log('server up on port', PORT);
});
