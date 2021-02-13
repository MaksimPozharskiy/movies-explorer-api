require('dotenv').config();
const express = require('express');
// const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const centralErrorsHandler = require('./middlewares/centralErrorsHandler');

const { PORT = 3000 } = process.env;
const app = express();

// Подлключение к БД movies-explorer
mongoose.connect('mongodb://localhost:27017/movies-explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(routes);

// app.use(errorLogger);
// app.use(errors());
app.use(centralErrorsHandler);

app.listen(PORT);
