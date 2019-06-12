const { validationResult } = require('express-validator/check');
const { Metric } = require('../db/models');

module.exports = {
  create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    (async () => {
      // Create the metric
      try {
        await Metric.create({
          action: req.body.action,
          source: req.body.source,
          user_id: req.user.id,
        });
      } catch (error) {
        return res.status(500).send(error);
      }

      return res.status(201).send({ message: 'Metric successfully added!' });
    })();
  },
};
