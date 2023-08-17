const router = require('express').Router();

router.post('/signin', require('../requestValidation').loginBodyValidator, require('../controllers/login').login);

module.exports = router;
