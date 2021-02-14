const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser, login, getMe, updateMe,
} = require('../controllers/users');
const {
  createMovie, getMovies,
} = require('../controllers/movies');
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');

// Роуты регистрации и авторизации
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// Роуты защищенные авторизацией
// User routes
router.use(auth);
router.get('/users/me', getMe);
router.put('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateMe);

// Movie routes
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
    trailer: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
    thumbnail: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.get('/movies', getMovies);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
