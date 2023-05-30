const router = require('express').Router();
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
const { signin, signup } = require('../utils/validDataRequest');
const { pageNotFount } = require('../utils/errorMessages');

router.post('/signin', signin, login);
router.post('/signup', signup, createUser);

router.get('/check-auth', auth, successfulAuth);
router.delete('/signout', auth, signOut);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.use('/', auth, () => {
  throw new NotFoundError(pageNotFount);
});

module.exports = router;
