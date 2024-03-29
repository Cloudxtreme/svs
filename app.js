'use strict';
var express = require('express')
  , fs = require('fs')
  , config = require('./config')
  , app = express()

if(!config.get('apiSecret')){
  console.log('No API Secret set, refusing to start...')
  process.exit()
}

//make sure the root folder exists
if(!fs.existsSync(config.get('root'))){
  fs.mkdirSync(config.get('root'))
}

//import file
app.get('/downloadFile',require('./downloadFile'))

app.use(express.static(config.get('root')))

app.listen('production' === process.env.NODE_ENV ? 80 : config.get('port'))

module.exports = app
