'use strict';

const express = require('express');
const gameRouter = require('./lib/game-router.js');
const PORT = process.env.PORT || 3000;
const app = express();
// run app middleware
// register routers
app.use(gameRouter);

app.use(function(err, req, res, next) {
  console.error(err.message);
  if(err.status)
    res.status(err.status).send();
  res.status(500).send();
});

app.listen(PORT, () => {
  console.log('server up on port', PORT);
});
