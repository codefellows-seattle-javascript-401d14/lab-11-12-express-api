'use strict';

const express = require('express');
const pokemonRouter = require('./route/pokemon-router.js');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(pokemonRouter);
app.use(function(err, req, res, next){
  console.error(err.message);
  if(err.status)
    res.status(err.status).send();
  res.status(500).send();
  next();
});

app.listen(PORT, () => {
  console.log('SERVER UP: Lets start catching pokemon', PORT);
});
