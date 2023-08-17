const router = require('express').Router();
const NotFoundError = require('../errors/notFoundError');
const auth = require('../middlewares/auth');

router.use(require('./signin'));
router.use(require('./signup'));
router.use(require('./signout'));
router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Not found'));
});

module.exports = router;
