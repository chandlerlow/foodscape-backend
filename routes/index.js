const express = require('express');

const router = express.Router();
const { check } = require('express-validator/check');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('../middleware/auth');
const staffAuth = require('../middleware/staffAuth');
const { User } = require('../db/models');
const { sequelize } = require('../db/models/index');
const itemController = require('../controllers/items');
const userController = require('../controllers/users');
const photoController = require('../controllers/photos');
const userInterestsController = require('../controllers/userinterests');
const metricController = require('../controllers/metrics');
const broadcastController = require('../controllers/broadcasts');
const adminController = require('../controllers/admin');

/* Configure authentication middleware */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id).then((user) => {
    done(null, user);
  }).catch ((error) => {
    done(error);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      where: sequelize.and(
        {
          'is_staff': true,
        },
        sequelize.where(
          sequelize.fn('lower', sequelize.col('username')),
          sequelize.fn('lower', username),
        )
      ),
    }).then((user) => {
      if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
      }
  
      // Check if user exists in database and compare password
      bcrypt.compare(password, user.password).then(res => {
        if (res === false) {
          return done(null, false, { message: 'Invalid credentials' });
        }
        
        return done(null, user);
      });
    }).catch ((error) =>{
      return done(error);
    });
  }
));

/* Default message on home page. */
router.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello WebApps!' });
});

/* POST to login page */
router.post('/auth/login', [
  check('username').exists(),
  check('password').exists(),
], userController.login);

/* POST to register new user page */
router.post('/auth/register', [
  check('username').exists(),
  check('password').exists(),
  check('name').exists(),
  check('location').exists(),
  check('phone_no').exists(),
], userController.register);


router.use('/metrics', auth);
router.post('/metrics', [check('action').exists()], metricController.create);

router.get('/broadcast', broadcastController.get);

/* Items routes (authentication required) */
router.use('/items', auth);

/* GET items to be shown for current user */
router.get('/items', itemController.list);

/* GET items listed by current user */
router.get('/items/user', itemController.listOwnedByCurrentUser);

/* POST new item */
router.post('/items', [
  check('name').exists(),
  check('quantity').exists(),
  check('expiry_date').exists().isAfter(),
  check('description').exists(),
  check('category_id').exists().isInt(),
], itemController.create);

/* PUT existing item */
router.put('/items/:id', [
  check('name').exists(),
  check('quantity').exists(),
  check('expiry_date').exists().isAfter(),
  check('description').exists(),
  check('category_id').exists().isInt(),
], itemController.update);

/* DELETE existing item */
router.delete('/items/:id', itemController.delete);

/* Mark item as collected */
router.post('/items/:id/collected', [
  check('is_collected').exists().isBoolean(),
], itemController.markCollected);

/* Photo upload route (authentication required) */
router.use('/photos/upload', auth);
router.post('/photos/upload', photoController.upload);

/* Mark someone being interested in an item */
router.post('/items/:id/interest', userInterestsController.post);

/* Halls admin */
router.get('/login', function(req, res) {
  res.render('admin/login.html');
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true, failWithError: true })
);

router.post('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

router.use('/admin', staffAuth);
router.get('/admin', adminController.get);
router.post('/admin', adminController.post);
router.post('/admin/delete', adminController.delete);

module.exports = router;
