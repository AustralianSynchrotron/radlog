module.exports = index;

function index(req, res) {
  return req.session.get('user', function (err, user) {
    if (!user) return res.redirect('/login');
    res.template('index.jade', {user: user});
  });
}
