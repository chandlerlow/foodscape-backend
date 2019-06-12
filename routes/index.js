const express = require('express');

const router = express.Router();
const { check } = require('express-validator/check');
const auth = require('../middleware/auth');
const itemController = require('../controllers/items');
const userController = require('../controllers/users');
const photoController = require('../controllers/photos');
const userInterestsController = require('../controllers/userinterests');


/* Default message on home page. */
router.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello WebApps!' });
});

/* POST to login page */
router.post('/auth/login', [
  check('username').exists(),
  check('password').exists(),
], userController.login);

/* POST to register new user page */
router.post('/auth/register', [
  check('username').exists(),
  check('password').exists(),
  check('name').exists(),
  check('location').exists(),
  check('phone_no').exists(),
], userController.register);

/* Items routes (authentication required) */
router.use('/items', auth);

/* GET items to be shown for current user */
router.get('/items', itemController.list);

/* GET items listed by current user */
router.get('/items/user', itemController.listOwnedByCurrentUser);

/* POST new item */
router.post('/items', [
  check('name').exists(),
  check('quantity').exists(),
  check('expiry_date').exists().isAfter(),
  check('description').exists(),
  check('category_id').exists().isInt(),
], itemController.create);

/* PUT existing item */
router.put('/items/:id', [
  check('name').exists(),
  check('quantity').exists(),
  check('expiry_date').exists().isAfter(),
  check('description').exists(),
  check('category_id').exists().isInt(),
], itemController.update);

/* DELETE existing item */
router.delete('/items/:id', itemController.delete);

/* Mark item as collected */
router.post('/items/:id/collected', [
  check('is_collected').exists().isBoolean(),
], itemController.markCollected);

/* Photo upload route (authentication required) */
router.use('/photos/upload', auth);
router.post('/photos/upload', photoController.upload);

/* Mark someone being interested in an item */
router.post('/items/:id/interest', userInterestsController.post);

module.exports = router;
