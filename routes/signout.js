const router = require('express').Router();

router.get('/signout', (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.status(200).send({ message: 'Exit success' });
});

module.exports = router;
