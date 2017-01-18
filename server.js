'use strict';

const express = require('express');
const beerRouter = require('./route/beer-router.js');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(beerRouter);


app.use(function(err, req, res, next) {
  console.error(err.message);
  if(err.status) {
    res.status(err.status).send();
    return;
  }
  res.status(500).send();
});

app.listen(PORT, () => {
  console.log('server lit', PORT);
});
