const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const NotValidError = require('../errors/notValidError');
const { notValidDataCreateMovie, notFoundMovie, notRemoveAlienMovie } = require('../utils/errorMessages');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201)
      .send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') return next(new NotValidError(notValidDataCreateMovie));

      next(error);
    });
};
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200)
      .send(movies))
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate('owner')
    .then((movie) => {
      if (!movie) throw new NotFoundError(notFoundMovie);
      if (!movie.owner.equals(req.user._id)) throw new ForbiddenError(notRemoveAlienMovie);

      Movie.findByIdAndDelete(movie._id)
        .then((removedMovie) => res.status(200)
          .send(removedMovie))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovieById,
};
