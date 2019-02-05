var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//Lab: new code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('userkiki:kiki@gettingstarted-shard-00-00-oxpeq.gcp.mongodb.net:27017,gettingstarted-shard-00-01-oxpeq.gcp.mongodb.net:27017,gettingstarted-shard-00-02-oxpeq.gcp.mongodb.net:27017/BlueEntry?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin&retryWrites=true'); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Lab: make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
 }); 
 

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
