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

      // Validate the category to ensure it exists
      try {
        const count = await Category.count({
          where: {
            id: {
              [op.eq]: req.body.category_id,
            },
          },
        });

        if (count !== 1) {
          return res.status(422).json({ message: 'Category not found' });
        }
      } catch (error) {
        return res.status(500).send(error);
      }

      // Create the item
      try {
        await Item.create({
          name: req.body.name,
          photo: req.body.photo === '' ? null : req.body.photo,
          quantity: req.body.quantity,
          expiry_date: req.body.expiry_date,
          description: req.body.description,
          category_id: req.body.category_id,
          user_id: req.user.id,
          is_collected: false,
        });
      } catch (error) {
        return res.status(500).send(error);
      }

      return res.status(201).send({ message: 'Item successfully added!' });
    })();
  },

  update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    (async () => {
      // Validate that the item exists and belongs to the current user
      try {
        const count = await Item.count({
          where: {
            id: {
              [op.eq]: req.params.id,
            },
            user_id: {
              [op.eq]: req.user.id,
            },
          },
        });

        if (count !== 1) {
          return res.status(422).json({ message: 'Item not found for user' });
        }
      } catch (error) {
        return res.status(500).send(error);
      }

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

      // Validate the category to ensure it exists
      try {
        const count = await Category.count({
          where: {
            id: {
              [op.eq]: req.body.category_id,
            },
          },
        });

        if (count !== 1) {
          return res.status(422).json({ message: 'Category not found' });
        }
      } catch (error) {
        return res.status(500).send(error);
      }

      // Update the item
      try {
        await Item.update({
          name: req.body.name,
          photo: req.body.photo === '' ? null : req.body.photo,
          quantity: req.body.quantity,
          expiry_date: req.body.expiry_date,
          description: req.body.description,
          category_id: req.body.category_id,
          user_id: req.user.id,
        }, { where: req.params.id });
      } catch (error) {
        return res.status(500).send(error);
      }

      return res.status(200).send({ message: 'Item successfully updated!' });
    })();
  },

  delete(req, res) {
    (async () => {
      // Delete the item
      try {
        const rowsDeleted = await Item.destroy({
          where: {
            id: {
              [op.eq]: req.params.id,
            },
            user_id: {
              [op.eq]: req.user.id,
            },
          },
        });

        if (rowsDeleted !== 1) {
          return res.status(422).send({ message: 'Item for user not found' });
        }
      } catch (error) {
        return res.status(500).send(error);
      }

      return res.status(200).send({ message: 'Item successfully deleted!' });
    })();
  },

  listOwnedByCurrentUser(req, res) {
    Item.findAll({
      where: {
        user_id: {
          [op.eq]: req.user.id,
        },
      },
      include: [
        {
          model: User,
        },
        {
          model: Category,
        },
      ],
      order: [
        ['is_collected', 'ASC'],
        ['expiry_date', 'ASC'],
      ],
      attributes: {
        exclude: ['user_id', 'category_id'],
      },
    }).then(items => res.status(200).send(items.map(i => ({
      id: i.id,
      name: i.name,
      photo: i.photo,
      quantity: i.quantity,
      expiry_date: i.expiry_date,
      description: i.description,
      is_collected: i.is_collected,
      created_at: i.createdAt,
      updated_at: i.updatedAt,
      user: {
        id: i.User.id,
        name: i.User.name,
        location: i.User.location,
        phone_no: i.User.phone_no,
      },
      category: {
        id: i.Category.id,
        name: i.Category.name,
      },
    })))).catch(error => res.status(400).send(error));
  },

  list(req, res) {
    (async () => {
      const result = {};

      // Get a list of category IDs
      let categoryIds;
      try {
        categoryIds = await Category.findAll().map(category => category.id);
      } catch (error) {
        return res.status(400).send(error);
      }

      // For every category ID, look up the items for this category
      let promises = [];

      categoryIds.forEach(async (categoryId) => {
        // Get items in each category, without waiting for jobs to complete
        const categoryItems = Item.findAll({
          where: {
            category_id: {
              [op.eq]: categoryId,
            },
            user_id: {
              [op.ne]: req.user.id,
            }
          },
          include: [{ model: User }, { model: Category }],
          order: [
            ['is_collected', 'ASC'],
            ['expiry_date', 'ASC'],
          ],
          attributes: {
            exclude: ['user_id', 'category_id'],
          },
        }).map(i => ({
          id: i.id,
          name: i.name,
          photo: i.photo,
          quantity: i.quantity,
          expiry_date: i.expiry_date,
          description: i.description,
          is_collected: i.is_collected,
          created_at: i.createdAt,
          updated_at: i.updatedAt,
          user: {
            id: i.User.id,
            name: i.User.name,
            location: i.User.location,
            phone_no: i.User.phone_no,
          },
          category: {
            id: i.Category.id,
            name: i.Category.name,
          },
        }));

        promises.push(categoryItems);
      });

      // We now wait for all jobs to complete
      promises = await Promise.all(promises);

      promises.forEach((categoryItems, categoryId) => {
        result[categoryId + 1] = categoryItems;
      });

      res.status(200).send(result);
    })();
  },

  markCollected(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    (async () => {
      // Validate that the item exists and belongs to the current user
      try {
        const count = await Item.count({
          where: {
            id: {
              [op.eq]: req.params.id,
            },
            user_id: {
              [op.eq]: req.user.id,
            },
          },
        });

        if (count !== 1) {
          return res.status(422).json({ message: 'Item not found for user' });
        }
      } catch (error) {
        return res.status(500).send(error);
      }

      // Update the item
      try {
        await Item.update({
          is_collected: req.body.is_collected,
        }, { where: req.params.id });
      } catch (error) {
        return res.status(500).send(error);
      }

      return res.status(200).send({ message: 'Item successfully updated!' });
    })();
  },
};
