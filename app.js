'use strict';
var express = require('express')
  , config = require('./config')
  , app = express()

app.use(express.static(config.get('videoRoot')))

app.listen('production' === process.env.NODE_ENV ? 80 : config.get('port'))