require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const centralErrorsHandler = require('./middlewares/centralErrorsHandler');
const limiter = require('./middlewares/limiter');

const { PORT = 3000, DB_ADRESS } = process.env;
const app = express();

// Подлключение к БД movies-explorer
mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(requestLogger);
app.use(errorLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(centralErrorsHandler);

app.listen(PORT);
