# svs [![Build Status](https://travis-ci.org/nullivex/svs.png?branch=master)](https://travis-ci.org/nullivex/svs)

Simple Video Server, implemented in Node.JS

## Import File

It is simple to import files via the RESTful API that SVS exposes.

URL: `http://<host>/downloadFile`

Type: `GET`

The import file API accepts the following parameters

* `secret` API secret set in config
* `url` URL to download the file from
* `destination` Path to download the file to with the filename, relative to `videoRoot`
* `overwrite` Optional, but can be used to overwrite existing files, will fail by default
* `dry` Optional, can be used to test if validation of a call passes without actually downloading a file.

## Config

There are a few simple configuration options available.

To define instance specific configuration options create `config.user.js` in the main project folder.

* `root` The absolute root where files are stored
* `port` Port the server listens on (will default to 80 when started with `NODE_ENV=production`
* `apiSecret` The secret to access the API calls, if omitted the server will fail to start

## Changelog

### 0.1.0

* Initial release