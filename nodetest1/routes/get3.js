var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

//7 myprofile
router.get('/myprofile',isLoggedIn,function(req,res,next){
    /*
    if (req.user.type == "attendee"){
        var atdprofile = req.atdprofile
        atdprofile.findOne({username : req.user.username}, function(e,docs){
            res.render('atdprofile',{currentUser:req.user ,profile:docs});
        })
    } else {
        var evoprofile = req.evoprofile
        evoprofile.findOne({username : req.user.username}, function(e,docs){
            res.render('evoprofile',{currentUser:req.user ,profile:docs});
        }) ;
    }
    */
    res.render('myprofile',{currentUser:req.user});
});

//8 myevent
router.get('/myevent',isLoggedIn,function(req,res,next){
    /*
    if (req.user.type == "attendee"){
        var eve = req.eve
        eve.find({reservation : {$elemMatch{reserveBy : req.user.username}}}, function(e,docs){
            res.render('atdevent',{currentUser:req.user ,myevent:docs});
        })
    } else {
        var eve = req.eve
        evำ.find({owner : req.user.username}, function(e,docs){
            res.render('evoevent',{currentUser:req.user ,myevent:docs});
        }) ;
    }
    */
    res.render('');
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.render("denied");
    }
}

module.exports = router;