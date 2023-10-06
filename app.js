const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const limiter = require('./utils/limiter');
const { PORT, DB_URL } = require('./utils/config');
const routes = require('./routes/routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect(DB_URL, { useNewUrlParser: true });
const app = express();
app.use(cors({
  credentials: true,
  maxAge: 15,
  optionsSuccessStatus: 200,
  origin: ['http://localhost:3000', 'https://aldonmovie.nomoredomainsicu.ru', 'http://aldonmovie.nomoredomainsicu.ru'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('Cервер запущен!');
});
