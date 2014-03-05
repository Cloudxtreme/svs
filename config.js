'use strict';
var ObjectManage = require('object-manage')
  , fs = require('fs')

var config = new ObjectManage()
config.load({
  port: 3000,
  root: './videos',
  apiSecret: ''
})

if(fs.existsSync('./config.user.js')){
  config.load(require('./config.user'))
}

module.exports = config