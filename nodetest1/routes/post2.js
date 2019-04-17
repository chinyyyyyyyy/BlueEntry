var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

//15 Anyone can search
router.post('/search', function (req, res) {
    if(req.body.category == null){
      res.redirect(`/results/q='${req.body.keyword}'&cat=allcat&pstart=0&pend=50000`);
    }else{
      res.redirect(`/results/q='${req.body.keyword}'&cat=${req.body.category}&pstart=${req.body.pstart}&pend=${req.body.pend}`);
    }
});

//16 Only Attendee can search
router.post('/reserve', function (req, res) {
    //Set our internal DB variable
    var reservedData = new req.reserve({
      "Fname": req.body.fname, 
      "Lname": req.body.lname, 
      "Email": req.body.email, 
      "Address": req.body.address
    });
    req.eve.findOneAndUpdate(
      { _id: req.body.id },
      { $push: { reservation:reservedData}},
      function (error, success) {
          if (error) {
              res.send("There was a problem adding the information to the database.");
          } else {
              setTimeout(function () {
                res.redirect("/");
              }, 1500);
          }
      });
});

module.exports = router;
