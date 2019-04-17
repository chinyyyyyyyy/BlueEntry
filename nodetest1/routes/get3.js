var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

//7 myprofile
router.get('/myprofile',isLoggedIn,function(req,res,next){

    if (req.user.type == "attendee"){
        req.atd.findOne({username : req.user.username}, function(e,docs){
            res.render('./attendeestuff/atdprofile',{currentUser:req.user ,profile:docs});
        })
    }else {
        req.evo.findOne({username : req.user.username}, function(e,docs){
            
            res.render('./eventorgstuff/evoprofile',{currentUser:req.user ,profile:docs});
        }) ;
    }
});

//8 myevent
router.get('/myevent',isLoggedIn,function(req,res,next){
    
        req.evo.findOne({username : req.user.username}, function(e,docs){
            console.log(docs.MyEvent)
            req.event.find({_id: {$in: docs.MyEvent}},function(e,docs2){
                console.log(docs2);
                res.render('./eventorgstuff/evoeventlist',{currentUser:req.user ,myevent:docs2});
            });
        }) ;
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.render("denied");
    }
}

module.exports = router;