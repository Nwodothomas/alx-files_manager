#!/usr/bin/node

const express = require('express');
const routes = require('./routes/index');

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
app.use(routes);



server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});
