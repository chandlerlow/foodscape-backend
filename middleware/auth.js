const jwt = require('jsonwebtoken');
const op = require('sequelize').Op;
const config = require('../config');
const { User } = require('../db/models');

module.exports = (req, res, next) => {
  // Retrieve JWT token from authorization header
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  // Verify the token with the provided secret
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Token is not valid',
      });
    }

    User.findOne({
      where: {
        id: {
          [op.eq]: decoded.userId,
        },
      },
      attributes: {
        exclude: ['password'],
      },
    }).then((user) => {
      if (!user) {
        return res.status(500).json({
          success: false,
          message: 'Unable to find user for token',
        });
      }

      req.user = user;
      next();
    });
  });
};
