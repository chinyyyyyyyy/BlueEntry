var express = require('express');
var router = express.Router();

/*===================================== GET home page ================================================ */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'BlueEntry' });
});
router.get('/helloworld', function (req, res, next) {
  res.render('helloworld', { title: 'My Hello' });
});
/*===================================== GET Events Page ================================================ */
router.get('/events/:id', function (req, res) {
  var db = req.db;
  var collection = db.get('events');
  collection.findOne({_id:req.params.id}, function (e, docs) {
    res.render('eventpage', { "event": docs });
  });
});

/*===================================== GET Eventslist Page ===========================================*/
router.get('/eventslist', function (req, res) {
  var db = req.db;
  var collection = db.get('events');
  collection.find({}, function (e, docs) {
    res.render('results', { "userlist": docs });
  });
});
router.get('/results/q=:key&cat=:cat&pstart=:pstart&pend=:pend', function (req, res) {
  var listcat = ['ComSci', 'Finance', 'HomeEcon', 'Life', 'Culture'];
  var db = req.db;
  var collection = db.get('events');
  var pstart = Number(req.params.pstart);
  var pend = Number(req.params.pend);
  var key = req.params.key;
  if (req.params.cat != 'allcat') {
    listcat = [req.params.cat];
  }
  if (key == "''") {
    collection.find({ $and: [{ Price: { $gte: pstart, $lte: pend } }, { Category: { $in: listcat } }] }, function (e, docs) {
      res.render('results', { "userlist": docs });
    });
  } else {
    collection.find({ $and: [{ $text: { $search: key } }, { Price: { $gte: pstart, $lte: pend } }, { Category: { $in: listcat } }] }, function (e, docs) {
      res.render('results', { "userlist": docs });
    });
  }
});
/*POST SERVICE FOR REDIRECT*/
router.post('/searching', function (req, res) {
  res.redirect(`/results/q='${req.body.keyword}'&cat=${req.body.category}&pstart=${req.body.pstart}&pend=${req.body.pend}`);
});
/*===================================== GET EventReservation Page =====================================*/
router.get('/HowToBuildWebApp', function (req, res) {
  res.render('newuser', { title: 'Add New User' });
});
/* POST to Add User Service */
router.post('/adduser', function (req, res) {
  // Set our internal DB variable
  // var db = req.db;
  // // Get our form values. These rely on the "name" attributes
  // var userFname = req.body.fname;
  // var userLname = req.body.lname;
  // var userAge = req.body.age;
  // var userEmail = req.body.email;
  // var userAddress = req.body.address;
  // // Set our collection
  // var collection = db.get('registration1');
  // // Submit to the DB
  // collection.insert({ "Fname": userFname, "Lname": userLname, "Age": userAge, "Email": userEmail, "Address": userAddress }, function (err, doc) {
  //   if (err) {
  //     // If it failed, return error
  //     res.send("There was a problem adding the information to the database.");
  //   }
  //   else {
  //     // And forward to success page
  //     setTimeout(function () {
  //       res.redirect("HowToBuildWebApp");
  //     }, 1500);
  //   }
  // });
  res.redirect("eventslist");
});

module.exports = router;
