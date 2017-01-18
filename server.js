'use strict';
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const debug = require('debug')('athletesApp: server');
const express = require('express');
const athletes = require('./routes/athletes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(athletes);

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);
  if(err.status){
    res.status(err.status).send();
    return;
  }
  res.status(500).send();
  next();
});
app.listen(process.env.PORT, () => {
  debug('server listening');
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
