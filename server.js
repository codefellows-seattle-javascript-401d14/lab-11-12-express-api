'use strict';

const express = require('express');
const app = express();
const athletes = require('./routes/athletes');
const PORT = process.env.PORT || 3000;

app.use(athletes);
app.use((err, req, res, next) => {
  console.error(err.message, err);
  res.status(500).send('Something broke!');
  next();
});
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
