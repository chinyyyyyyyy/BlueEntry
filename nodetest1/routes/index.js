var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');
    User                  = require('./users');
/*===================================== Authentication Page ================================================ */
router.get('/login',function(req,res,next){
  res.render('login');
});

router.post('/login',passport.authenticate("local",{
      successRedirect: "/myprofile",
      failureRedirect: "/login"
}),function(req,res,next){
});

router.get('/register',function(req,res,next){
  res.render('register');
});
router.post('/regis',function(req,res){
  console.log(req.body.username);
  User.register(new User({username: req.body.username}), req.body.password, function(err,user){
    if(err){
        console.log(err);
        return res.redirect('/register');
    }
    passport.authenticate("local")(req,res,function(){
        res.redirect('/register');
    });
  });
});

router.get('/myprofile',function(req,res,next){
  res.render('myprofile',{currentUser:req.user});
});




/*===================================== GET home page ================================================ */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'BlueEntry' });
});
/*===================================== GET Events Page ================================================ */
router.get('/events/:id', function (req, res) {
    var eve = req.eve;
    eve.findOne({_id:req.params.id}, function (e, docs) {
    res.render('eventpage', { "event": docs });
  });
});
/*===================================== GET Eventslist Page ===========================================*/
router.get('/eventslist', function (req, res) {
  var eve = req.eve;
  eve.find({}, function (e, docs) {
    res.render('results', { "userlist": docs });
  });
});
router.get('/results/q=:key&cat=:cat&pstart=:pstart&pend=:pend', function (req, res) {
  var listcat = ['ComSci', 'Finance', 'HomeEcon', 'Life', 'Culture'];
  var eve = req.eve;
  var pstart = Number(req.params.pstart);
  var pend = Number(req.params.pend);
  var key = req.params.key;
  if (req.params.cat != 'allcat') {
    listcat = [req.params.cat];
  }
  if (key == "''") {
    eve.find({ $and: [{ Price: { $gte: pstart, $lte: pend } }, { Category: { $in: listcat } }] }, function (e, docs) {
      res.render('results', { "userlist": docs });
    });
  } else {
    eve.find({ $and: [{ $text: { $search: key } }, { Price: { $gte: pstart, $lte: pend } }, { Category: { $in: listcat } }] }, function (e, docs) {
      res.render('results', { "userlist": docs });
    });
  }
});
router.post('/searching', function (req, res) {
  res.redirect(`/results/q='${req.body.keyword}'&cat=${req.body.category}&pstart=${req.body.pstart}&pend=${req.body.pend}`);
});
/*===================================== GET EventReservation Page =====================================*/
router.get('/HowToBuildWebApp', function (req, res) {
  res.render('newuser', { title: 'Add New User' });
});
/* POST to Add User Service */
router.post('/addattendee', function (req, res) {
  //Set our internal DB variable
  var db = req.db;
  var collection = db.get('events');
  var reservedData = {"Fname": req.body.fname, "Lname": req.body.lname, "Age": req.body.age, "Email": req.body.email, "Address": req.body.address };
  collection.update({"_id":req.body.id},{$push:{'reservation':reservedData}},function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      setTimeout(function () {
        res.redirect("/eventslist");
      }, 1500);
    }
  });
});

module.exports = router;
