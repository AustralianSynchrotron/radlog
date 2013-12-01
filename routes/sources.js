module.exports = sources;

var formidable = require('formidable');

function sources(req, res) {
  switch (req.method) {
    case 'GET':
      return showSources(req, res);
    case 'POST':
      if(typeof(req.params.id) === 'undefined') {
        return newSource(req, res);
      }
      return updateSource(req.params.id, req, res);
    default:
      return res.error(405);
  }
}

function newSource(req, res) {
  var form = formidable.IncomingForm();
  form.parse(req, function(err, fields) {
    var name = fields.name || '';
    var source = new req.models.Source({name: name});
    source.save(function(err) {
      showSources(req, res, {error: err ? err.message : null});
    });
  });
}

function updateSource(id, req, res) {
  req.models.Source.findById(id, function(err, source) {
    if(err) {
      return showSources(req, res, {error: err});
    }
    var form = formidable.IncomingForm();
    form.parse(req, function(err, fields) {
      if(fields.name) source.name = fields.name;
      if(fields.borrower) source.borrower = fields.borrower;
      if(fields.area) source.area = fields.area;
      if(fields.borrowed) source.borrowed = fields.borrowed;
      if(fields.returned) source.returned = fields.returned;
      source.save(function(err) {
        // TODO: Handle error
        res.redirect('/sources', 303);
      });
    });
  });
}

function showSources(req, res, locals) {
  locals = locals || {};
  req.models.Source.find({}).sort('name').exec(function(err, sources) {
    locals.sources = sources;
    res.template('sources.jade', locals);
  });
}
