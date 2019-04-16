var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

//15 Anyone can search
router.post('/search', function (req, res) {
    console.log(req.body);
    if(req.body.category == null){
      res.redirect(`/results/q='${req.body.keyword}'&cat=allcat&pstart=0&pend=50000`);
    }else{
      res.redirect(`/results/q='${req.body.keyword}'&cat=${req.body.category}&pstart=${req.body.pstart}&pend=${req.body.pend}`);
    }
});

//16 Only Attendee can search
router.post('/reserve', function (req, res) {
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
