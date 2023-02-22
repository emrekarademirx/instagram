const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

const loginRouter = require('./routes/login');
const followingsRouter = require('./routes/followings');
const likeRouter = require('./routes/like');
const unfollowRouter = require('./routes/unfollow');

const app = express();

// Görünüm motoru olarak EJS'yi kullan
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ortak bileşenler
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
}));

// Yönlendirmeler
app.use('/login', loginRouter);
app.use('/followings', followingsRouter);
app.use('/like', likeRouter);
app.use('/unfollow', unfollowRouter);

// 404 hatası yönetimi
app.use(function(req, res, next) {
  next(createError(404));
});

// Hata yönetimi
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
