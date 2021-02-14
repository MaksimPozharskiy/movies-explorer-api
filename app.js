require('dotenv').config();
const express = require('express');
// const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const router = require('./routes/index');
const centralErrorsHandler = require('./middlewares/centralErrorsHandler');

const { PORT = 3000, DB_ADRESS } = process.env;
const app = express();

// Подлключение к БД movies-explorer
mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(router);

// app.use(errorLogger);
// app.use(errors());
app.use(centralErrorsHandler);

app.listen(PORT);
