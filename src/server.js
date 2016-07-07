require('log-a-log');

const _ = require('lodash');
const Q = require('q');
const uuid = require('uuid');
const Redis = require('ioredis');
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');

const FS = require('fs');
const dgram = require('dgram');

var port = 13579;

var sock = dgram.createSocket('udp4');
var app = express();

app.use((req, res, next) => {
  if (req.headers['Content-Type'] === 'application/json') {
    res.status(400).send({message: "Invalid content type."});
  } else {
    next();
  }
});

app.use(bodyParser.json());

app.post('/ip', (req, res) => {
  console.log("Received message: ", req.body);
  res.send({result: "success"});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

