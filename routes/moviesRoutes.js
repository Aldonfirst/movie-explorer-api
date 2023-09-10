const router = require('express').Router();

const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');

const { validateMovieId, validateCreateMovie } = require('../middlewares/validateCelebrate');

router.get('/movies', getMovies);
router.post('/movies', validateCreateMovie, createMovies);
router.delete('/movies/_id', validateMovieId, deleteMovies);

module.exports = router;
