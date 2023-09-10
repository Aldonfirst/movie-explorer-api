const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errorsCatch/UnauthorizedError');
const { JWT_SECRET, NODE_ENV } = require('../utils/config');

function authMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('Требуется авторизация пользователя');
  }

  try {
    const payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev-secret');
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authMiddleware,
};
