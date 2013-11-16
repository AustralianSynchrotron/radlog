var routes = require('routes')
  , router = new routes.Router();

module.exports = router;

var public = require('./routes/public');
router.addRoute('/css/*?', public);
router.addRoute('/js/*?', public);

router.addRoute('/', require('./routes/index'));
router.addRoute('/login', require('./routes/login'));
router.addRoute('/logout', require('./routes/logout'));
router.addRoute('/sources', require('./routes/sources'));
