var createError           = require('http-errors'),
    express               = require('express'),
    path                  = require('path'), 
    cookieParser          = require('cookie-parser'),
    logger                = require('morgan'),
    indexRouter           = require('./routes/index');
    passport              = require('passport');
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');
    User                  = require('./routes/users');
var app = express();

app.use(require('express-session')({
  secret: "Hi",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Database Part//
var db = require('mongoose');
db.connect('mongodb+srv://userkiki:kiki@gettingstarted-oxpeq.gcp.mongodb.net/BlueEntry?retryWrites=true',{ useNewUrlParser: true });
  var Regis = new db.Schema({
    Fname: String,
    Lname: String,
    Age: String,
    Email: String,
    Address: String,
  });
  var Event = new db.Schema({
    Ename: String,
    Category: String,
    Price: Number,
    AvaiSeat: Number,
    reservation: [{
        Fname: String,
        Lname: String,
        Age: String,
        Email: String,
        Address: String
    }]
  });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  req.db = db;
  req.reg = db.model('registration1',Regis);
  req.eve = db.model('events',Event);
  next();
 }); 
 

app.use('/', indexRouter);

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
