const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ConflictError = require('../errors/conflictError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь с таким id не найден');
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) next(new BadRequestError('Переданы некорректные данные в метод получения пользователя'));
      else next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь с таким id не найден');
      return res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) next(new ConflictError('Этот email уже занят'));
      else if (err instanceof mongoose.Error.ValidationError) next(new BadRequestError('Переданы некорректные данные в метод обновления профиля пользователя'));
      else next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) next(new ConflictError('Пользователь с таким email уже существует'));
      else if (err instanceof mongoose.Error.ValidationError) next(new BadRequestError('Переданы некорректные данные в метод создания пользователя'));
      else next(err);
    });
};
