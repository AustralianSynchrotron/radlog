var routes = require('routes')
  , router = new routes.Router()

module.exports = router

var public = require('./routes/public')
router.addRoute('/css/*?', public)
router.addRoute('/js/*?', public)
router.addRoute('/images/*?', public)

router.addRoute('/', require('./routes/index'))
router.addRoute('/login', require('./routes/login'))
router.addRoute('/logout', require('./routes/logout'))
router.addRoute('/sources', require('./routes/sources'))
router.addRoute('/sources/:id', require('./routes/sources'))
router.addRoute('/loans', require('./routes/loans'))
router.addRoute('/loans/:id/:operation(check-out|check-in)', require('./routes/loans'))
