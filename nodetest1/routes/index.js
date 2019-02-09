var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BlueEntry' });
});

router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'My Hello' });
 }); 

/*---------------------- GET Eventslist Page ---------------------------------*/
router.get('/eventslist', function(req, res) {
  var db = req.db;
  var collection = db.get('events');
  collection.find({},{},function(e,docs){
  res.render('eventslist', {"userlist" : docs});
  });
 }); 

/*---------------------- GET Eventslist Page ---------------------------------*/
router.post('/searching',function(req,res){
  console.log(req.body.keyword);
});


router.get('/search/:start/:end', function(req, res) {
  var db = req.db;
  var collection = db.get('events');
  var start = Number(req.params.start);
  var end = Number(req.params.end);
  collection.find({Price:{$gte:start,$lte:end}},function(e,docs){
    res.render('results', {"userlist" : docs});
    });
  }); 
/*---------------------- GET EventReservation Page ---------------------------------*/
router.get('/HowToBuildWebApp', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});


/* POST to Add User Service */
router.post('/adduser', function(req, res) {
// Set our internal DB variable
  var db = req.db;
// Get our form values. These rely on the "name" attributes
  var userFname = req.body.fname;
  var userLname = req.body.lname;
  var userAge = req.body.age;
  var userEmail = req.body.email;
  var userAddress = req.body.address;
// Set our collection
  var collection = db.get('registration1');
// Submit to the DB
  collection.insert({"Fname" : userFname,"Lname" : userLname,"Age" : userAge,"Email" : userEmail,"Address" : userAddress}, function (err, doc) {
    if (err) {
// If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
// And forward to success page
      setTimeout(function(){
        res.redirect("HowToBuildWebApp");
      }, 1500); 
    }
  });
});
 
 

module.exports = router;
