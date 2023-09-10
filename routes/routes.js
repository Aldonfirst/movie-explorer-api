const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');
const usersRouter = require('./userRoutes');
const moviesRouter = require('./moviesRoutes');

const NotFoundError = require('../utils/errorsCatch/NotFoundError');
const { login, createUser } = require('../controllers/users');

const { validateRegister, validateLogin } = require('../middlewares/validateCelebrate');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);

router.use(authMiddleware);

router.get('/signout', (req, res) => {
  res.clearCookie('token').send({ message: 'Пользователь вышел из своего Аккаунта' });
});

router.use(usersRouter);
router.use(moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена 404 '));
});

module.exports = router;
