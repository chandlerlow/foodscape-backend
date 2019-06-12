const express = require('express');
const path = require('path');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const logger = require('morgan');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
require('dotenv').config();

// Routes
const indexRouter = require('./routes');

const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

module.exports = app;
