const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser, login, getMe, updateMe,
} = require('../controllers/users');
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

module.exports = router;
