'use strict';

const express = require('express');
const commentRouter = require('./route/commentRouter.js');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(commentRouter);
app.use(function(err, req, res, next){
  console.error(err.message);
  if(err.status)
    res.status(err.status).send();
  res.status(500).send();
})

app.listen(PORT, () => {
  console.log('server up', PORT);
});
