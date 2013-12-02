module.exports = login

var formidable = require('formidable')
  , ldap = require('ldapjs')

function login (req, res) {
  switch(req.method) {
    case 'GET':
      if (!req.user) return res.template('login.jade', res.viewData)
      return res.redirect('/')
    case 'POST':
      return authenticate(req, res)
  }
}

function authenticate (req, res) {
  formidable.IncomingForm().parse(req, function (err, fields) {

    if(!fields.username || !fields.password) {
      res.viewData.error = 'Username or password not provided.'
      return res.template('login.jade', res.viewData)
    }

    var client = ldap.createClient({
      url: req.config.ldap.host + ':' + req.config.ldap.port
    })

    client.bind(fields.username + '@synchrotron.org.au', fields.password, function (err) {
      client.unbind()

      if(err) {
        res.viewData.error = 'Username or password incorrect.'
        return res.template('login.jade', res.viewData)
      }

      res.session.set('user', {username: fields.username})
      res.session.get('done', function (er, done) {
        res.session.del('done')
        res.redirect(done || '/')
      })
    })

  })
}
