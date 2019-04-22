var createError           = require('http-errors'),
    express               = require('express'),
    path                  = require('path'), 
    cookieParser          = require('cookie-parser'),
    logger                = require('morgan'),
    router_get1           = require('./routes/get1'),
    router_get2           = require('./routes/get2'),
    router_get3           = require('./routes/get3'),
    router_get4           = require('./routes/get4'),
    router_post1          = require('./routes/post1'),
    router_post2          = require('./routes/post2'),
    router_post3          = require('./routes/post3'),
    router_post4          = require('./routes/post4'),
    passport              = require('passport'),
    LocalStrategy         = require('passport-local'),
    User                  = require('./routes/users'),
    nodemailer            = require('nodemailer');
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

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'blueentry.se@gmail.com',
    pass: 'blue.entry2019'
  }
});

//Database Part//
var db = require('mongoose');
db.connect('mongodb+srv://userkiki:kiki@gettingstarted-oxpeq.gcp.mongodb.net/BlueEntry?retryWrites=true',{ useNewUrlParser: true });
  var Credit_schema = new db.Schema({
    CNO: String,
    CName: String,
    CVV: String,
    EXP: String
  });

  var Atd = new db.Schema({
    username: String,
    Fname: String,
    Lname: String,
    Tel: String,
    Email: String,
    DOB: String,
    Gender: String,
    Credit: [Credit_schema],
    MyReserve: [db.Schema.Types.ObjectId],
    ImgLink: String
  });
  var Evo = new db.Schema({
    username: String,
    Name: String,
    Tel: String,
    Email: String,
    MyEvent: [db.Schema.Types.ObjectId],
    ImgLink: String
  });

  var reservation_shcema = new db.Schema({
    Fname: String,
    Lname: String,
    Address: String,
    Tel: String,
    Event: db.Schema.Types.ObjectId,
    Reserver: String,
    Payment: String,
    Valid: Boolean,
    Amount: Number,
    ImgLink: String,
    ReserveTimestamp : db.Schema.Types.Date
  })

  var Event = new db.Schema({
    username:String,
    Ename: String,
    Category: String,
    Detail: String,
    Price: Number,
    MaxSeat: Number,
    Location: String,
    Exp: String,
    Contact: String,
    Boost : Boolean,
    ImgLink: String,
    reservation: [db.Schema.Types.ObjectId]
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
  req.atd = db.model('attendee',Atd);
  req.evo = db.model('eventorg',Evo);
  req.event = db.model('events',Event);
  req.reserve = db.model('reservation',reservation_shcema);
  req.credit = db.model('credit',Credit_schema);
  req.transport = transport;
  next();
 }); 
 

app.use('/', router_get1);
app.use('/', router_get2);
app.use('/', router_get3);
app.use('/', router_get4);
app.use('/', router_post1);
app.use('/', router_post2);
app.use('/', router_post3);
app.use('/', router_post4);


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
