var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

//17 Attendee Edit profile
router.post('/editattendeeprofile',function(req,res){
    req.atd.findOneAndUpdate({username : req.user.username},
        {
            Fname: req.body.fname,
            Lname: req.body.lname,
            Tel: req.body.tel,
            Email: req.body.email,
            DOB: req.body.dob,
            Gender: req.body.gender
        
        } ,function(e,docs){
        res.redirect("/myprofile");
    });
});

//18 Attendee Edit profile pic
router.post('/editattendeepic',function(req,res){
    req.atd.findOneAndUpdate({username : req.user.username},{ImgLink:req.body.link} ,function(e,docs){
        res.redirect("/myprofile");
    });

});

//19 Attendee Edit card
router.post('/editcard',function(req,res){

});

//20 Attendee delete card
router.post('/deletecard',function(req,res){

});

//21 Attendee add card
router.post('/addcard',function(req,res){

});

//22 Attendee add receipt
router.post('/addreceipt',function(req,res){

});

module.exports = router;
