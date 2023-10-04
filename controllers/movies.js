const Movie = require('../models/movies');
const NotFoundError = require('../utils/errorsCatch/NotFoundError');
const ForbiddenError = require('../utils/errorsCatch/ForbiddenError');
const BadRequestError = require('../utils/errorsCatch/BadRequestError');

module.exports.getMovies = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const movies = await Movie.find({ owner: _id });
    res.status(200).send(movies);
  } catch (error) {
    next(error);
  }
};

module.exports.createMovies = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const movie = await Movie.create({ owner: _id, ...req.body });
    res.status(201).send(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(error);
    }
  }
};

module.exports.deleteMovies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new NotFoundError('Фильм с указанным _id не найден');
    } else if (movie.owner.toString() === req.user.id) {
      throw new ForbiddenError('В доступе отказано');
    } else {
      const removedMovie = await Movie.findByIdAndRemove(id);
      res.send({ removedMovie });
    }
  } catch (error) {
    next(error);
  }
};
