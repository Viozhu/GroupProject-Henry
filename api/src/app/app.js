const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('./auth/setup');

const corsOptions = {
  credentials: true,
  origin: process.env.FRONT_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const router = require('./routes');

const { MONGO_URI } = process.env;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// logging middleware
app.use(logger('dev'));

// bodyparse middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session
app.use(
  session({
    secret: 'very secret key',
    resave: false,
    saveUninitialized: true,
    httpOnly: true,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    sameSite: true,
  }),
);

// Passport middlewares
app.use(passport.initialize({}));
app.use(passport.session({}));

app.use(cors(corsOptions));
app.use('/api', router);

module.exports = app;
