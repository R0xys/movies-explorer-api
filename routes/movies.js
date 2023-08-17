const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', require('../requestValidation').createMoviesBodyValidator, createMovie);
router.delete('/:movieId', require('../requestValidation').deleteMoviesParamsValidator, deleteMovie);

module.exports = router;
