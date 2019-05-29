const Item = require('../db/models').Item;

module.exports = {
  create(req, res) {
    return Item.create({
      name: req.body.name,
      location: req.body.location,
      phone_no: req.body.phone_no,
    })
    .then(item => res.status(201).send(item))
    .catch(error => res.status(400).send(error));
  }
};
