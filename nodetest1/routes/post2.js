var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

//15 Anyone can search
router.post('/search', function (req, res) {
    var pstart = 0;
    var pend = 50000;
    var key ="";
    if(req.body.pstart != ""){
      pstart = req.body.pstart;
    }
    if(req.body.pend != ""){
      pend = req.body.pend;
    }
    if(req.body.keyword !=""){
      key= req.body.keyword;
    }
    if(req.body.category == null){
      res.redirect(`/results/q=${key}&cat=allcat&pstart=0&pend=50000`);
    }else{
      res.redirect(`/results/q=${key}&cat=${req.body.category}&pstart=`+pstart+`&pend=${pend}`);
    }
});

//16 Only Attendee can search
router.post('/reserve', function (req, res) {
    //Set our internal DB variable
    var reservedData;
    var mailData = "";
    if (req.body.payment=="credit"){
      reservedData = new req.reserve({
        "Fname": req.body.fname, 
        "Lname": req.body.lname,  
        "Address": req.body.address,
        "Tel": req.body.tel,
        "Event": req.body.id,
        "Reserver": req.user.username,
        "Payment": req.body.payment,
        "Valid": true,
        "Amount": req.body.amount,
        "ImgLink": "",
        "ReserveTimestamp" : new Date()
      });
      mailData = "Reservation complete!\nThank you for joining our event."
    } else {
      reservedData = new req.reserve({
        "Fname": req.body.fname, 
        "Lname": req.body.lname, 
        "Address": req.body.address,
        "Tel": req.body.tel,
        "Event": req.body.id,
        "Reserver": req.user.username,
        "Payment": req.body.payment,
        "Valid": false,
        "Amount": req.body.amount,
        "ImgLink": "",
        "ReserveTimestamp" : new Date()
      });
      mailData = "Your reservation is pending for transfer receipt.\nPlease upload the evidence to confirm your reservation in time.\nOtherwise, Your reservation will be cancelled."
    }
    // req.event.findOneAndUpdate(
    //   { _id: req.body.id },
    //   { $push: { reservation:reservedData}},
    //   function (error, success) {
    //       if (error) {
    //           res.send("There was a problem adding the information to the database.");
    //       } else {
    //           setTimeout(function () {
    //             res.redirect("/");
    //           }, 1500);
    //       }
    //   });
    reservedData.save()
    req.atd.findOneAndUpdate(
      { username: req.user.username },
      { $push: { MyReserve: reservedData._id } },function(e,docs){
        if (e) console.log(e);
        req.transport.sendMail({
          from: 'blueentry.se@gmail.com',
          to: docs.Email,
          subject: 'Event reservation',
          text: mailData
        });
    });
    req.event.findOneAndUpdate(
      { _id: req.body.id },
      { $push: { reservation: reservedData._id } },function(e){
        if (e) console.log(e);
    });
    res.redirect("/");
});

module.exports = router;
