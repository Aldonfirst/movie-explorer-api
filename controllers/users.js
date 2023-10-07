const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, NODE_ENV } = require('../utils/config');
const NotFoundError = require('../utils/errorsCatch/NotFoundError');
const ConflictError = require('../utils/errorsCatch/ConflictError');
const UnauthorizedError = require('../utils/errorsCatch/UnauthorizedError');
const BadRequestError = require('../utils/errorsCatch/BadRequestError');

// регистрация
module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      throw new ConflictError('Пользователь с таким электронным адресом уже зарегистрирован');
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const selectedUser = await User.findById(user._id);
    console.log('Пользователь успешно создан:', selectedUser);
    req.user = user;
    next();
    res.status(201).send(selectedUser);
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      next(new ConflictError('Пользователь с таким электронным адресом уже зарегистрирован'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные при регистрации пользователя'));
    } else {
      next(err);
    }
  }
};
// авторизация
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email }).select('+password');
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordCorrect) {
      throw new UnauthorizedError('Ошибка при авторизации пользователя');
    }
    console.log('Пользователь успешно вошел:', user);
    console.log('Пароль верный:', isPasswordCorrect);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    console.log('Сгенерированный токен:', token);
    res.status(200).send({ token });
  } catch (err) {
    next(err);
  }
};
// гет запрос users/me
module.exports.getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .orFail(() => {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      });
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
// патч запрос users/me
module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const { _id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, email },
      { new: true, runValidators: true },
    )
      .orFail(() => {
        throw new NotFoundError('Пользователь с таким _id не найден');
      });
    res.status(200).send(updatedUser);
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      next(new ConflictError('Пользователь с таким email адресом уже зарегистрирован'));
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};
