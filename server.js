'use strict';

require('dotenv').config();
const cors = require('cors'); //before all routes
const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('commentapp:server');

const commentRouter = require('./route/commentRouter.js');
const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(commentRouter);
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
  debug('starting server');
  console.log('server up on port', process.env.PORT);
});
