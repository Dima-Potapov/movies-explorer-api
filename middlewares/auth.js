const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorizedError');
require('dotenv')
  .config();

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const jwtKey = req.cookies.jwt;

  if (!jwtKey) throw new UnauthorizedError('Необходима авторизация');

  let payload;

  try {
    payload = jwt.verify(jwtKey, JWT_SECRET);

    User.findById(payload._id)
      .then((user) => {
        req.user = user;

        next();
      })
      .catch((err) => {
        throw new UnauthorizedError('Авторизация не пройдена');
      });
  } catch (err) {
    throw new UnauthorizedError('Авторизация не пройдена');
  }
};
