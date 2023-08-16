const router = require('express').Router();
const NotFoundError = require('../errors/notFoundError');

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Not found'));
});

module.exports = router;
