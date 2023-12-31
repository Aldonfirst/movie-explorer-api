const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 160,
  windowMS: 55000,
  message: 'В настоящий момент превышено количество запросов на сервер. Пожалуйста,повторите позже.',
});

module.exports = limiter;
