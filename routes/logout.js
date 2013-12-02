module.exports = logout

function logout (req, res) {
  res.session.del('userId')
  res.redirect('/')
}
