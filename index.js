#!/usr/bin/env node
var config = require('./config')
  , router = require('./router')
  , decorate = require('./decorate')
  , http = require('http')
  , url = require('url');

http.createServer(function(req, res) {
  decorate(req, res, config);

  var parsed = url.parse(req.url);
  var route = router.match(parsed.path);
  if(!route) {
    res.writeHead(404);
    return res.end("Not found\n"); 
  }
  req.params = route.params;
  route.fn(req, res);
}).listen(config.port);
console.log('Listening on ', config.port);
