const express = require('express');

const router = express.Router();
const itemController = require('../controllers/itemController');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).send({ message: 'Hello world!' });
});

/* GET item with given id. */
router.get('/items/:item_id', itemController.get);

/* POST new item. */
router.post('/items', itemController.create);

/* GET items to be shown for user with given user_id. */
router.get('/items/foruser/:user_id', itemController.showItems);

module.exports = router;
