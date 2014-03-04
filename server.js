'use strict';
var clusterMaster = require('cluster-master')

clusterMaster({
  exec: 'app.js',
  env: {NODE_ENV: 'production'},
  repl: {address: '127.0.0.1', port: 3002}
})