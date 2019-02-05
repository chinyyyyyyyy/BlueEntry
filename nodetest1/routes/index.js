var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'My Hello' });
 }); 

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('registration1');
  collection.find({},{},function(e,docs){
  res.render('userlist', {
  "userlist" : docs
  });
  });
 }); 

 /* GET New User page. */
router.get('/newuser', function(req, res) {
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
      res.redirect("userlist");
    }
  });
});
 
 

module.exports = router;
