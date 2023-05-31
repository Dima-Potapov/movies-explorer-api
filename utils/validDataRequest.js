const {
  celebrate,
  Joi,
} = require('celebrate');

const validCreateMovie = celebrate({
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
        .number()
        .required(),
      nameRU: Joi
        .string()
        .required(),
      nameEN: Joi
        .string()
        .required(),
    }),
});

const deleteMovie = celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string()
        .required(),
    }),
});

const patchUserMe = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validCreateMovie,
  deleteMovie,
  patchUserMe,
  signin,
  signup,
};
