require('dotenv').config();
const express = require('express');
const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');

// Тут подключаем роуты с авторизацией
// Тут подключить логеры
// Тут подключаем роуты без авторизации
// Тут полдключить мидлвару авторизации
// Тут подключить 404 ошибку для цетнрализованого обработчика

const { PORT = 3000 } = process.env;
const app = express();

// Подлключение к БД movies-explorer
mongoose.connect('mongodb://localhost:27017/movies-explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);
