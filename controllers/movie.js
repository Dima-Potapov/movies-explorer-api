const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const NotValidError = require('../errors/notValidError');

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
      if (error.name === 'ValidationError') return next(new NotValidError('Переданы некорректные данные при создании карточки'));

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
  const { movieId } = req.params;

  Movie.findById(movieId)
    .populate('owner')
    .then((movie) => {
      if (!movie) throw new NotFoundError('Карточка с указанным _id не найдена');
      if (!movie.owner[0].equals(req.user._id)) throw new ForbiddenError('Нельзя удалить чужую карточку');

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
