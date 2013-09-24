module.exports = decorate;

var ErrorPage = require('error-page')
  , Templar = require('templar')
  , jade = require('jade')
  , path = require('path')
  , templateFolder = path.resolve(__dirname, 'views')
  , templateOptions = { engine: jade, folder: templateFolder };

function decorate(req, res, config) {
  res.error = ErrorPage(req, res, {});
  res.template = Templar(req, res, templateOptions);
}
