const Item = require('../db/models').Item;
const User = require('../db/models').User;
const op = require('sequelize').Op;

module.exports = {
  create(req, res) {
    // Create new item with specified name, photo, quantity, expiry date
    // and description
    return Item.create({
      name: req.body.name,
      photo: req.body.photo,
      quantity: req.body.quantity,
      expiry_date: req.body.expiry_date,
      description: req.body.description,
      user_id: 2
    })
    .then(item => res.status(201).send("Item successfully added!"))
    .catch(error => res.status(400).send(error));
  },

  get(req, res) {
    // Get item with given id 
    return Item.findByPk(req.params.item_id, {
      include: {
        model: User
      },
      attributes: {
        exclude: ["user_id"]
      }
    })
    .then(item => res.status(200).send(item))
    .catch(error => res.status(400).send(error));
  },

  showItems(req, res) {
    // Show all items that don't belong to user with given user_id
    return Item.findAll({
      where: {
        user_id: {
          [op.ne]: req.params.user_id
        }
      },
      include: {
        model: User
      },
      attributes: {
        exclude: ["user_id"]
      }
    })
    .then(items => res.status(200).send(items))
    .catch(error => res.status(400).send(error));
  }
};
