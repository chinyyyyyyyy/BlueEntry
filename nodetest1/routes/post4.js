var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');


//23 Event Org Edit profile
router.post('/editeventorgprofile',function(req,res){
    req.evo.findOneAndUpdate({username : req.user.username},
        {
            Name: req.body.name,
            Tel: req.body.tel,
            Email: req.body.email,
        } ,function(e,docs){
        res.redirect("/myprofile");
    });
});

//24 Event Org Edit profile pic
router.post('/editeventorgpic',function(req,res){
    req.evo.findOneAndUpdate({username : req.user.username},{ImgLink:req.body.link} ,function(e,docs){
        res.redirect("/myprofile");
    });

});

//25 Event Org add event
router.post('/addevent',function(req,res){
    var newEvent = new req.event({
        Ename: req.body.name,
        Category: req.body.category,
        Detail: req.body.detail,
        Price: req.body.price,
        MaxSeat: req.body.seat,
        Location: req.body.location,
        Exp: req.body.exp,
        Contact: req.body.contact,
        reservation: []
    });
    newEvent.save(function(e){
        if (e) console.log(e);
    })
    req.evo.findOneAndUpdate(
        { username: req.user.username },
        { $push: { MyEvent: newEvent._id } },function(e){
            if (e) console.log(e);
    });
    res.redirect('/');
});

//26 Event Org boost event
router.post('/boost',function(req,res){

});

//27 Event Org edit event
router.post('/editevent',function(req,res){

});

//28 Event Org valid Attendee's receipt
router.post('/validreceipt',function(req,res){

});

module.exports = router;
