const Movie = require('../models/movie');
// const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request');

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  // const movieId = req.movie._id; это будет браться с другого API

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
    // movieId, - это будет браться с другого API
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

module.exports = { createMovie };
