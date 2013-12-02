module.exports = logout

function logout (req, res) {
  res.session.del('user')
  res.redirect('/')
}
