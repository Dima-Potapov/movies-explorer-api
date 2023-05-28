const mongoose = require('mongoose');
const { linkRegex } = require('../utils/regexTemplates');

const cardSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => linkRegex.test(v),
      message: 'Неправильный формат Url',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => linkRegex.test(v),
      message: 'Неправильный формат Url',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => linkRegex.test(v),
      message: 'Неправильный формат Url',
    },
  },
  owner: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }],
  movieId: [{
    type: String,
    required: true,
  }],
  nameRU: [{
    type: String,
    required: true,
  }],
  nameEN: [{
    type: String,
    required: true,
  }],
});

module.exports = mongoose.model('movie', cardSchema);