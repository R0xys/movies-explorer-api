const { celebrate, Joi } = require('celebrate');

module.exports.updateUserBodyValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.createUserBodyValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.createMoviesBodyValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().regex(/^https?:\/\/(www.)?([\w\-._~:/?#[\]@!$&'()*+,;=])+$/),
    trailerLink: Joi.string().uri().regex(/^https?:\/\/(www.)?([\w\-._~:/?#[\]@!$&'()*+,;=])+$/),
    thumbnail: Joi.string().uri().regex(/^https?:\/\/(www.)?([\w\-._~:/?#[\]@!$&'()*+,;=])+$/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMoviesParamsValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports.loginBodyValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
