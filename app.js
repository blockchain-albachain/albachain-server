var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passportConfig = require('./function/funUsers/passport');
const flash = require('connect-flash');
const passport = require('passport');
//        , LocalStrategy = require('passport-local').Strategy;
var session = require('express-session'); //세션연결
var mpassportConfig = require('./function/funUsers/Mpassport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var musersRouter = require('./routes/musers');

// DB connection
var dbconfig = require('./dbconfig/albachaindb')();
var connection = dbconfig.init();
dbconfig.start_db(connection);
connection.on('error', function() {})


var app = express();

/* session middleware */
app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 // 1h
    , httpOnly: true
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passportConfig();
// mpassportConfig();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// var bodyParser = require("body-parser");
// var mysql = require('mysql');
// var router = express.Router();
// var bcrypt = require('bcrypt');

// Parse application/json inputs.
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());
// app.set("json spaces", 4);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/musers', musersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
