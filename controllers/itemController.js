const Item = require('../db/models').Item;

module.exports = {
  create(req, res) {
    // Create new item with specified name, photo, quantity, expiry date
    // and description
    return Item.create({
      name: req.body.name,
      photo: req.body.photo,
      quantity: req.body.quantity,
      expiry_date: req.body.expiry_date,
      description: req.body.description
    })
    .then(item => res.status(201).send("Item successfully added!"))
    .catch(error => res.status(400).send(error));
  },

  get(req, res) {
    // Get item with specified id 
    return Item.findByPk(req.params.id)
    .then(item => res.status(200).send(item))
    .catch(error => res.status(400).send(error));
  }
};
