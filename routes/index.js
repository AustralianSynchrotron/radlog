module.exports = index;

function index(req, res) {
  if (!req.user) return res.redirect('/login')
  res.template('index.jade', res.viewData)
}
