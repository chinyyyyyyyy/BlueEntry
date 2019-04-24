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
// router.post('/editcard',function(req,res){
//     req.atd.findOneAndUpdate({username : req.user.username},
//         {
//             Fname: req.body.fname,
//             Lname: req.body.lname,
//             Tel: req.body.tel,
//             Email: req.body.email,
//             DOB: req.body.dob,
//             Gender: req.body.gender
        
//         } ,function(e,docs){
//         res.redirect("/myprofile");
//     });
// });

//20 Attendee delete card
router.post('/deletecard',function(req,res){
    req.atd.findOneAndUpdate(
        { username: req.user.username },
        { $pull: { Credit:{_id:[req.body.id]}} },function(e){
          if (e) console.log(e);
        res.redirect('/myprofile');
      });
});

//21 Attendee add card
router.post('/addcard',function(req,res){
    var newcard = new req.credit({
        CNO: req.body.cno,
        CName: req.body.cname,
        CVV: req.body.cvv,
        EXP: req.body.exp
    })
    // console.log(newcard);
    req.atd.findOneAndUpdate(
        { username: req.user.username },
        { $push: { Credit: newcard} },function(e){
          if (e) console.log(e);
        res.redirect('/myprofile');
      });
});

//22 Attendee add receipt
router.post('/addreceipt',function(req,res){
    req.reserve.findOneAndUpdate({"_id": req.body.id},{ImgLink: req.body.link}, function(e){
        res.redirect("/myevent");
    });
});

module.exports = router;
