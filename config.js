require('dotenv').config();

module.exports = {
  secret: process.env.PORT.JWT_SECRET || 'milkroad',
  saltRounds: 12,
};
