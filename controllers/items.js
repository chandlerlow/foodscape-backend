const op = require('sequelize').Op;
const { validationResult } = require('express-validator/check');
const { Item } = require('../db/models');
const { User } = require('../db/models');

module.exports = {
  create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    return Item.create({
      name: req.body.name,
      photo: req.body.photo,
      quantity: req.body.quantity,
      expiry_date: req.body.expiry_date,
      description: req.body.description,
      user_id: req.user.id,
    }).then(() => res.status(201).send({ message: 'Item successfully added!' }))
      .catch(error => res.status(400).send(error));
  },

  listOwnedByCurrentUser(req, res) {
    Item.findAll({
      where: {
        user_id: {
          [op.eq]: req.user.id,
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
          [op.ne]: req.user.id,
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
