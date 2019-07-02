var createError = require('http-errors');//
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//这个是获取到的路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//设置了模版引擎
app.set('view engine', 'hbs');

//使用自带中间件
app.use(logger('dev'));
app.use(express.json());//解析jsoin
app.use(express.urlencoded({ extended: false }));//解析url
app.use(cookieParser());//解析cookie
//设置暴露的文件，外部可访问的文件
app.use(express.static(path.join(__dirname, 'public')));

//路由指定路径
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
