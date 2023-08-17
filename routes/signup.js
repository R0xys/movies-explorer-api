const router = require('express').Router();

router.post('/signup', require('../requestValidation').createUserBodyValidator, require('../controllers/users').createUser);

module.exports = router;
