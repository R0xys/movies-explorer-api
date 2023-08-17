const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) next(new BadRequestError('Переданы некорректные данные в метод создания фильма'));
      else next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError('Фильм с таким id не найдена');
      if (userId !== movie.owner.valueOf()) throw new ForbiddenError('Такого фильма нет в вашей фильмолтеке');
      movie.deleteOne()
        .then((requiredMovie) => res.send({ movie: requiredMovie }))
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) next(new BadRequestError('Переданы некорректные данные в метод удаления фильма'));
      else next(err);
    });
};
