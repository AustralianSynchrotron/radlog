#!/usr/bin/env node
var config = require('./config')
  , router = require('./router')
  , decorate = require('./decorate')
  , http = require('http')
  , url = require('url')
  , mongoose = require('mongoose')
  , RedSess = require('redsess');

RedSess.createClient(config.redis);
mongoose.connect('mongodb://localhost/sources');

http.createServer(function(req, res) {
  decorate(req, res, config);

  var parsed = url.parse(req.url);
  var route = router.match(parsed.path);

  if(!route) return res.error(404);

  req.params = route.params;
  route.fn(req, res);

}).listen(config.http.port, config.http.host);

console.log('Listening on ', config.http.port);
