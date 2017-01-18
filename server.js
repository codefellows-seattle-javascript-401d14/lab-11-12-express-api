'use strict';

require('dotenv').load();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('thundercatapp:server');

const thundercatRouter = require('./router/thundercat-router.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(thundercatRouter);

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);
  if(err.status)
    res.status(err.status).send();
  res.status(500).send();
});

app.listen(process.env.PORT, () => {
  debug('starting server');
  console.log(' ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n',
'░░░░░░░▄▄▀▀▀▀▀▀▀▀▀▀▀▀▄▄░░░░░░░\n',
'░░░░░▄▀░░░░░░░░░░░▄▄▄░░▀▄░░░░░\n',
'░░░▄▀░░░░░░░░░▄▄███▀▄██▄░▀▄░░░\n',
'░░█░░░░░░░░▄█████▄▄█████▄░░█▄░\n',
'░█░░░░░░░▄█▀▄████████████▄░░█░\n',
'░█░░░░▄█████████████▄▀████░░█░\n',
'░█░░▄█████████████████░███░░█░\n',
'░█░░█████▀░░░░░███████▀███░░█░\n',
'░▀▄░▀███░░░░░░░██████▀░░▀▀░░█░\n',
'░░▀▄░░▀█▄░░░░░▄██▀▀░░░░░░░░░█░\n',
'░░░▀▄░░░░░▄▄▄████▄▄░░░░░░░▄▀░░\n',
'░░░░░▀▄▄░░░▀▀▀▀▀▀▀░░░░░░▄▀░░░░\n',
'░░░░░░░░▀▀▄▄▄▄▄▄▄▄▄▄▀▀▀░░░░░░░\n',
'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n',process.env.PORT);
});
