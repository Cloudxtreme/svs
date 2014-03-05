'use strict';
var expect = require('chai').expect
  , restler = require('restler')
  , app = require('../app')
  , config = require('../config')
  , fs = require('fs')

describe('downloadFile',function(){
  var server
  before(function(done){
    server = app.listen(9081,done)
  })
  after(function(){
    server.close()
  })
  it('should fail without a secret',function(done){
    restler.get('http://localhost:9081/downloadFile').on('complete',function(result,res){
      expect(res.statusCode).to.equal(200)
      expect(result.status).to.equal('error')
      expect(result.message).to.equal('Permission denied')
      done()
    })
  })
  it('should fail without a url',function(done){
    var data = {secret: 'foo'}
    restler.get('http://localhost:9081/downloadFile',{query: data}).on('complete',function(result,res){
      expect(res.statusCode).to.equal(200)
      expect(result.status).to.equal('error')
      expect(result.message).to.equal('No download URL sent')
      done()
    })
  })
  it('should fail without a destination',function(done){
    var data = {secret: 'foo', url: 'http://files.esited.com/vimrc'}
    restler.get('http://localhost:9081/downloadFile',{query: data}).on('complete',function(result,res){
      expect(res.statusCode).to.equal(200)
      expect(result.status).to.equal('error')
      expect(result.message).to.equal('Invalid destination')
      done()
    })
  })
  it('should fail when the destination already exists',function(done){
    var file = config.get('root') + '/foo.txt'
    fs.writeFileSync(file,'foo')
    var data = {secret: 'foo', url: 'http://files.esited.com/vimrc', destination: 'foo.txt'}
    restler.get('http://localhost:9081/downloadFile',{query: data}).on('complete',function(result,res){
      expect(res.statusCode).to.equal(200)
      expect(result.status).to.equal('error')
      expect(result.message).to.equal('Destination file already exists')
      fs.unlinkSync(file)
      done()
    })
  })
  it('should allow overwrite of destination',function(done){
    var file = config.get('root') + '/foo.txt'
    fs.writeFileSync(file,'foo')
    var data = {secret: 'foo', url: 'http://files.esited.com/vimrc', destination: 'foo.txt', overwrite: 'true', dry: 'true'}
    restler.get('http://localhost:9081/downloadFile',{query: data}).on('complete',function(result,res){
      expect(res.statusCode).to.equal(200)
      expect(result.status).to.equal('success')
      expect(result.message).to.equal('Dry test successful! File would be downloaded')
      fs.unlinkSync(file)
      done()
    })
  })
  it('should download the file',function(done){
    var file = config.get('root') + '/foo.txt'
    var data = {secret: 'foo', url: 'http://files.esited.com/vimrc', destination: 'foo.txt'}
    restler.get('http://localhost:9081/downloadFile',{query: data}).on('complete',function(result,res){
      expect(res.statusCode).to.equal(200)
      expect(result.status).to.equal('success')
      expect(result.message).to.equal('File download successfully')
      fs.unlinkSync(file)
      done()
    })
  })
})
