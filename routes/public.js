module.exports = public;

var st = require('st')
  , path = require('path');

var mount = st(path.join(process.cwd(), 'public'));

function public(req, res) {
  if(!mount(req, res)) return res.error(404);
}
