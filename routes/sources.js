module.exports = sources;

function sources(req, res) {
  switch (req.method) {
    default:
      return res.error(405);
  }
}
