const router = require('express')
  .Router();
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movie');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object()
    .keys({
      country: Joi
        .string()
        .required(),
      director: Joi
        .string()
        .required(),
      duration: Joi
        .number()
        .required(),
      year: Joi
        .string()
        .required(),
      description: Joi
        .string()
        .required(),
      image: Joi
        .string()
        .required()
        .uri(),
      trailerLink: Joi
        .string()
        .required()
        .uri(),
      thumbnail: Joi
        .string()
        .required()
        .uri(),
      movieId: Joi
        .string()
        .required(),
      nameRU: Joi
        .string()
        .required(),
      nameEN: Joi
        .string()
        .required(),
    }),
}), createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.string()
        .required()
        .hex()
        .length(24),
    }),
}), deleteMovieById);

module.exports = router;
