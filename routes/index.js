const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const {
  login,
  createUser,
  signOut,
  successfulAuth,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), createUser);

router.get('/check-auth', auth, successfulAuth);
router.delete('/signout', auth, signOut);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);
router.use('/', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
