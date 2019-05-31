const express = require('express');

const router = express.Router();
const itemController = require('../controllers/itemController');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).send({ message: 'Hello world!' });
});

/* GET items to be shown for the authenticated user. */
router.get('/user/items', itemController.listOwnedByAuthenticated);

/* GET items to be shown for user (except for the current one if authenticated). */
router.get('/items', itemController.list);

/* POST new item. */
router.post('/items', itemController.create);

module.exports = router;
