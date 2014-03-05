'use strict';
var express = require('express')
  , config = require('./config')
  , app = express()

if(!config.get('apiSecret')){
  console.log('No API Secret set, refusing to start...')
  process.exit()
}

//import file
app.get('/downloadFile',require('./downloadFile'))

app.use(express.static(config.get('root')))

//only listen if called directly
if(require.main === module){
  app.listen('production' === process.env.NODE_ENV ? 80 : config.get('port'))
}

module.exports = app