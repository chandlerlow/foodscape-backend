const express = require('express');

const router = express.Router();
const { check } = require('express-validator/check');
const auth = require('../middleware/auth');
const itemController = require('../controllers/items');
const userController = require('../controllers/users');


/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello WebApps!' });
});

router.post('/auth/login', [
  check('username').exists(),
  check('password').exists(),
], userController.login);

router.post('/auth/register', [
  check('username').exists(),
  check('password').exists(),
  check('name').exists(),
  check('location').exists(),
  check('phone_no').exists(),
], userController.register);

/* Items routes (authentication required) */
router.use('/items', auth);
/* GET items to be shown for the authenticated user. */
router.get('/items/user', itemController.listOwnedByCurrentUser);
/* GET items to be shown for user (except for the current one if authenticated). */
router.get('/items', itemController.list);
/* POST new item. */
router.post('/items', [
  check('name').exists(),
  check('photo').exists(),
  check('quantity').exists(),
  check('expiry_date').exists().isAfter(),
  check('description').exists(),
], itemController.create);

module.exports = router;
