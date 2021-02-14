const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image, trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Данные не прошли валидацию');
      }
    })
    .catch(next);
};

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findOneAndRemove({ owner: req.user._id, _id: req.params.movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('У пользователя нет фильма с таким id');
      }
      return res.status(200).send({ message: 'Фильм удалён' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Данные не прошли валидацию');
      }
      throw err;
    })
    .catch(next);
};

module.exports = { createMovie, getMovies, deleteMovie };
