var express = require('express');
var router = express.Router();
var itemController = require('../controllers/itemController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({message: 'Hello world!'});
});

/* GET item with specific id. */
router.get('/items/:id', itemController.get);

/* POST new item. */
router.post('/items/:id', itemController.create);

module.exports = router;
