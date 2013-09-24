module.exports = decorate;

var Templar = require('templar')
  , jade = require('jade')
  , path = require('path')
  , templateFolder = path.resolve(__dirname, 'views')
  , templateOptions = { engine: jade, folder: templateFolder };

function decorate(req, res, config) {
  res.template = Templar(req, res, templateOptions);
}
