const router = require('express').Router();
const { updateUser, getUserInfo } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/validateCelebrate');

router.get('/users/me', getUserInfo);
router.patch('/users/me', validateUpdateProfile, updateUser);

module.exports = router;
