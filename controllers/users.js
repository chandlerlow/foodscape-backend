const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../db/models');
const { sequelize } = require('../db/models/index');


module.exports = {
  login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    (async () => {
      try {
        const user = await User.findOne({
          where: sequelize.where(
            sequelize.fn('lower', sequelize.col('username')),
            sequelize.fn('lower', req.body.username),
          ),
        });

        // Check if user exists in database and compare password
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
          return res.status(403).json({ message: 'Invalid credentials' });
        }

        // Generate and return JWT token due to successful authentication
        const token = jwt.sign({ userId: user.id }, config.secret);
        return res.json({
          id: user.id,
          name: user.name,
          location: user.location,
          phone_no: user.phone_no,
          token,
        });
      } catch (e) {
        return res.status(500).send(e);
      }
    })();
  },

  register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    (async () => {
      const count = await User.count({
        where: sequelize.where(
          sequelize.fn('lower', sequelize.col('username')),
          sequelize.fn('lower', req.body.username),
        ),
      });

      if (count > 0) {
        return res.status(422).json({ message: 'Username already exists' });
      }

      // Generate and store a bcrypt-ed version of the password
      try {
        const user = await User.create({
          username: req.body.username,
          password: await bcrypt.hash(req.body.password, config.saltRounds),
          name: req.body.name,
          location: req.body.location,
          phone_no: req.body.phone_no,
          is_staff: false,
        });

        const token = jwt.sign({ userId: user.id }, config.secret);
        return res.json({
          id: user.id,
          name: user.name,
          location: user.location,
          phone_no: user.phone_no,
          token,
        });
      } catch (e) {
        return res.status(500).send(e);
      }
    })();
  },
};
