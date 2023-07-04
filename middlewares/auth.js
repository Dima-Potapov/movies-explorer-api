const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorizedError');
const { needAuth, errorAuth } = require('../utils/errorMessages');
require('dotenv')
  .config();

const { JWT_SECRET = 'dev-secret' } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(needAuth);
  }

  const token = extractBearerToken(authorization);

  try {
    const payloadToken = jwt.verify(token, JWT_SECRET);

    User.findById(payloadToken._id)
      .then((user) => {
        req.user = user;

        next();
      })
      .catch((err) => {
        throw new UnauthorizedError(errorAuth);
      });
  } catch (err) {
    throw new UnauthorizedError(errorAuth);
  }
};
