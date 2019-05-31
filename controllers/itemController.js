const op = require('sequelize').Op;
const { Item } = require('../db/models');
const { User } = require('../db/models');

module.exports = {
  create(req, res) {
    return Item.create({
      name: req.body.name,
      photo: req.body.photo,
      quantity: req.body.quantity,
      expiry_date: req.body.expiry_date,
      description: req.body.description,
      user_id: 2, // TODO(Kelvin): use user ID of authenticated user
    }).then(() => res.status(201).send('Item successfully added!'))
      .catch(error => res.status(400).send(error));
  },

  listOwnedByAuthenticated(req, res) {
    Item.findAll({
      where: {
        user_id: {
          [op.eq]: 1, // TODO(Kelvin): use user ID of authenticated user
        },
      },
      include: {
        model: User,
      },
      attributes: {
        exclude: ['user_id'],
      },
    }).then(items => res.status(200).send(items.map(i => ({
      id: i.id,
      name: i.name,
      photo: i.photo,
      quantity: i.quantity,
      expiry_date: i.expiry_date,
      description: i.description,
      created_at: i.createdAt,
      updated_at: i.updatedAt,
      user: {
        id: i.User.id,
        name: i.User.name,
        location: i.User.location,
        phone_no: i.User.phone_no,
      },
    })))).catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Item.findAll({
      where: {
        user_id: {
          [op.ne]: 1, // TODO(Kelvin): exclude current user's ID only if authenticated
        },
      },
      include: {
        model: User,
      },
      attributes: {
        exclude: ['user_id'],
      },
    }).then(items => res.status(200).send(items.map(i => ({
      id: i.id,
      name: i.name,
      photo: i.photo,
      quantity: i.quantity,
      expiry_date: i.expiry_date,
      description: i.description,
      created_at: i.createdAt,
      updated_at: i.updatedAt,
      user: {
        id: i.User.id,
        name: i.User.name,
        location: i.User.location,
        phone_no: i.User.phone_no,
      },
    })))).catch(error => res.status(400).send(error));
  },
};
