'use strict';
var fs = require('fs')
  , path = require('path')
  , http = require('http')
  , config = require('./config')

var downloadFile = function(url,dest,cb) {
  if(!fs.existsSync(path.dirname(dest))){
    fs.mkdirSync(path.dirname(dest))
  }
  var file = fs.createWriteStream(dest)
  http.get(url,function(response){
    response.pipe(file)
    file.on('finish',function(){
      file.close()
      cb()
    })
    file.on('error',function(err){
      file.close()
      cb(err)
    })
  })
}

module.exports = function(req,res){
  var destination = config.get('root') + '/' + req.query.destination
  if(req.query.secret !== config.get('apiSecret')){
    res.send({status: 'error', message: 'Permission denied'})
  } else if(!req.query.url){
    res.send({status: 'error', message: 'No download URL sent'})
  } else if(!req.query.destination){
    res.send({status: 'error', message: 'Invalid destination'})
  } else if(fs.existsSync(destination) && !req.query.overwrite){
    res.send({status: 'error', message: 'Destination file already exists'})
  } else {
    if(req.query.dry){
      res.send({status: 'success', message: 'Dry test successful! File would be downloaded'})
    } else {
      downloadFile(req.query.url,destination,function(err){
        if(err){
          res.send({status: 'error', message: err})
        } else {
          res.send({status: 'success', message: 'File download successfully'})
        }
      })
    }
  }
}