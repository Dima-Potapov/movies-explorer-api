const router = require('express')
  .Router();
const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movie');
const { validCreateMovie, deleteMovie } = require('../utils/validDataRequest');

router.get('/', getMovies);
router.post('/', validCreateMovie, createMovie);
router.delete('/:id', deleteMovie, deleteMovieById);

module.exports = router;
