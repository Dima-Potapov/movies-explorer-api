const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotValidError = require('../errors/notValidError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');
const {
  notValidDataCreateUser, uniqueEmailCreateUser, uniqueEmailPatchUser,
  notValidDataPatchUser, notValidForLogin,
} = require('../utils/errorMessages');

require('dotenv')
  .config();

const { JWT_SECRET = 'dev-secret' } = process.env;

const getAuthUser = (req, res) => {
  res.status(200).send(req.user);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name,
        email,
        password: hash,
      },
    ))

    .then((user) => res.status(201)
      .send({
        _id: user._id,
        name: user.name,
        email: user.email,
      }))
    .catch((error) => {
      if (error.name === 'ValidationError') return next(new NotValidError(notValidDataCreateUser));
      if (error.code === 11000) return next(new ConflictError(uniqueEmailCreateUser));

      next(error);
    });
};

const updateUser = (req, res, next) => {
  const {
    email,
    name,
  } = req.body;
  const { _id: userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      email,
      name,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.status(200)
      .send(user))
    .catch((error) => {
      if (error.codeName === 'DuplicateKey') return next(new ConflictError(uniqueEmailPatchUser));
      if (error.name === 'CastError') return next(new NotValidError(notValidDataPatchUser));
      if (error.name === 'ValidationError') return next(new NotValidError(notValidDataPatchUser));

      next(error);
    });
};

const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError(notValidForLogin);

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!user || !matched) throw new UnauthorizedError(notValidForLogin);

          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

          res
            .cookie('jwt', token, {
              maxAge: 604800,
              httpOnly: true,
              sameSite: true,
            })
            .status(200)
            .send({ message: 'Авторизация прошла успешно!' })
            .end();
        });
    })
    .catch(next);
};

const signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'cookie удалена!' });
};

const successfulAuth = (req, res) => {
  res.send({ message: 'Пользователь авторизован!' });
};

module.exports = {
  getAuthUser,
  createUser,
  updateUser,
  login,
  signOut,
  successfulAuth,
};
