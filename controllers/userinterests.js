const op = require('sequelize').Op;
const { UserInterests } = require('../db/models');
const { Item } = require('../db/models');

module.exports = {
  upsert(req, res) {
    (async () => {
      // Validate the item to ensure it exists
      try {
        const count = await Item.count({
          where: {
            id: {
              [op.eq]: req.params.id,
            },
          },
        });

        if (count !== 1) {
          return res.status(422).json({ message: 'Item not found' });
        }
      } catch (error) {
        return res.status(500).send(error);
      }

      // Update the UserInterests model
      try {
        await UserInterests.findOrCreate({
          where: {
            item_id: req.params.id,
            user_id: req.user.id,
          },
        });
      } catch (error) {
        return res.status(500).send(error);
      }

      return res.status(200).send({ message: 'Interest successfully registered!' });
    })();
  },

  delete(req, res) {
    (async() => {
      // Delete the appropriate record in the UserInterests model
      try {
        const rowsDeleted = await UserInterests.destroy({
          where: {
            item_id: {
              [op.eq]: req.params.id,
            },
            user_id: {
              [op.eq]: req.user.id,
            },
          },
        });

        if (rowsDeleted !== 1) {
          return res.status(422).send({ message: 'User wasn\'t interested in item!' });
        }
      } catch (error) {
        return res.status(500).send(error);
      }

      return res.status(200).send({ message: 'Interest successfully removed!' });
    })();
  },
};
