const Movie = require('../models/movie');
// const NotFoundError = require('../errors/not-found-err');
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
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports = { createMovie, getMovies };
