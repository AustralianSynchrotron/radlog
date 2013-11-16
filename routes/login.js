module.exports = login;

var formidable = require('formidable');
var ldap = require('ldapjs');

function login(req, res) {
  switch(req.method) {
    case 'GET':
      return req.session.get('user', function (err, user) {
        if (!user) return res.template('login.jade');
        res.redirect('/');
      });
    case 'POST':
      return authenticate(req, res);
  }
}

function authenticate(req, res) {
  var form = formidable.IncomingForm();
  form.parse(req, function(err, fields) {

    if(!fields.username || !fields.password) {
      return res.template('login.jade', {error: 'Username or password not provided.'});
    }

    var client = ldap.createClient({
      url: req.config.ldap.host + ':' + req.config.ldap.port
    });

    client.bind(fields.username + '@synchrotron.org.au', fields.password, function(err) {
      client.unbind();

      if(err) {
        return res.template('login.jade', {error: 'Username or password incorrect.'});
      }

      res.session.set('user', {username: fields.username});
      res.session.get('done', function (er, done) {
        res.session.del('done');
        res.redirect(done || '/');
      });
    });

  });
}
