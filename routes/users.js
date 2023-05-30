const router = require('express').Router();
const {
  getAuthUser,
  updateUser,
} = require('../controllers/users');
const { patchUserMe } = require('../utils/validDataRequest');

router.get('/me', getAuthUser);
router.patch('/me', patchUserMe, updateUser);

module.exports = router;
