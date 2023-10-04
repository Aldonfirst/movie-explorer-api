const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errorsCatch/UnauthorizedError');
const { JWT_SECRET, NODE_ENV } = require('../utils/config');

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Требуется авторизация пользователя');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Требуется авторизация '));
  }

  req.user = payload;

  return next();
}

module.exports = {
  authMiddleware,
};
