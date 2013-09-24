var routes = require('routes')
  , router = new routes.Router();

module.exports = router;

router.addRoute('/', require('./routes/index'));
