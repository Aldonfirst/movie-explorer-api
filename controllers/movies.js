const Movie = require('../models/movies');
const NotFoundError = require('../utils/errorsCatch/NotFoundError');
const ForbiddenError = require('../utils/errorsCatch/ForbiddenError');
const BadRequestError = require('../utils/errorsCatch/BadRequestError');

module.exports.getMovies = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const movies = await Movie.find({ owner: _id });
    res.send(movies);
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
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Фильм с указанным _id не найден');
    } else if (movie.owner.toString() === req.user._id) {
      throw new ForbiddenError('В доступе отказано');
    } else {
      const removedMovie = await Movie.findByIdAndRemove(movieId);
      res.send({ removedMovie });
    }
  } catch (error) {
    next(error);
  }
};
