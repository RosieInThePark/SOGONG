var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var joinRouter = require('./routes/join');
var infoboard = require('./routes/infoboard');
var noticeboard = require('./routes/noticeboard');
var questboard = require('./routes/questboard');
var productboard = require('./routes/productBoard');
var paymentRouter = require('./routes/payment');
var cartRouter = require('./routes/cart');
var chartRouter = require('./routes/chart');

var app = express();

//session 설정
app.use(session({
  secret:'fnwfnqfnqufnw',
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//이미지 views
app.use('/icons', express.static('uploads-/ecommerce'));
app.use('/user', express.static('uploads-/user'));
app.use('/mainpage', express.static('uploads-/mainpage_'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/infoboard',infoboard);
app.use('/noticeboard', noticeboard);
app.use('/questboard', questboard);
app.use('/productBoard', productboard);
app.use('/payment', paymentRouter);
app.use('/cart', cartRouter);
app.use('/chart', chartRouter);

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
