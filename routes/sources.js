module.exports = sources;

var formidable = require('formidable');

function sources(req, res) {
  if(!req.user) {
    res.session.set('done', '/sources')
    return res.redirect('/login')
  }
  switch (req.method) {
    case 'GET':
      return showSources(req, res)
    case 'POST':
      if(typeof(req.params.id) === 'undefined') {
        return newSource(req, res)
      }
      return updateSource(req.params.id, req, res)
    default:
      return res.error(405)
  }
}

function newSource(req, res) {
  var form = formidable.IncomingForm();
  form.parse(req, function(err, fields) {
    var name = fields.name || '';
    var loan = new req.models.Loan({});
    var source = new req.models.Source({name: name, loan: loan});
    loan.source = source
    loan.save(function(err) {
      source.save(function(err) {
        if(err) {
          res.viewData.error = err.message
        }
        showSources(req, res)
      });
    });
  });
}

function updateSource(id, req, res) {
  // TODO: Use find and update
  req.models.Source.findById(id, function(err, source) {
    if(err) {
      res.viewData.error = err.message
      return showSources(req, res)
    }
    var form = formidable.IncomingForm();
    form.parse(req, function(err, fields) {
      if(fields.name) source.name = fields.name;
      source.save(function(err) {
        // TODO: Handle error
        res.redirect('/sources', 303);
      });
    });
  });
}

function showSources(req, res) {
  req.models.Source.find().populate('loan').sort('name').exec(function(err, sources) {
    res.viewData.sources = sources;
    res.session.get('error', function(err, value) {
      res.session.del('error')
      res.viewData.error = value
      res.template('sources.jade', res.viewData);
    })
  });
}
