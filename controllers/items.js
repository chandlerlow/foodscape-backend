const op = require('sequelize').Op;
const { validationResult } = require('express-validator/check');
const { Item } = require('../db/models');
const { User } = require('../db/models');
const { Image } = require('../db/models');
const { Category } = require('../db/models');

module.exports = {
  create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    (async () => {
      // Validate the photo if it exists; we must ensure that the photo uploaded is already in the
      // database for the current user
      if (req.body.photo != null && req.body.photo !== '') {
        try {
          const count = await Image.count({
            where: {
              user_id: {
                [op.eq]: req.user.id,
              },
              filename: {
                [op.eq]: req.body.photo,
              },
            },
          });

          if (count === 0) {
            return res.status(422).json({ message: 'Image not found for user' });
          }
        } catch (error) {
          return res.status(500).send(error);
        }
      }

      // Create the item
      try {
        await Item.create({
          name: req.body.name,
          photo: req.body.photo === '' ? null : req.body.photo,
          quantity: req.body.quantity,
          expiry_date: req.body.expiry_date,
          description: req.body.description,
          user_id: req.user.id,
        });
      } catch (error) {
        return res.status(500).send(error);
      }

      return res.status(201).send({ message: 'Item successfully added!' });
    })();
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
    (async () => {
      const result = {};

      // Getting all the items for backwards compatibility
      try {
        const allItems = await Item.findAll({
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
        }).map(i => ({
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
          category: i.category_id,
        }));
        result.all_categories = allItems;
        // working here
      } catch (error) {
        return res.status(400).send(error);
      }

      // Get a list of category IDs
      let categoryIds;
      try {
        categoryIds = await Category.findAll({
          attributes: {
            exclude: ['category_id'],
          },
        }).map(category => category.id);
      } catch (error) {
        return res.status(400).send(error);
      }

      // For every category ID, look up the items for this category
      for (const categoryId of categoryIds) {
        const categoryItems = await Item.findAll({
          where: {
            category_id: {
              [op.eq]: categoryId,
            },
          },
          include: [{
            model: User,
          }],
          attributes: {
            exclude: ['user_id'],
          },
        }).map(i => ({
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
          category: i.category_id,
        }));

        result[categoryId] = categoryItems;
      }

      res.status(200).send(result);
    })();
  },
};
