var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

//9 EventOrg AddEvent
router.get('/addevent',EVO_Login,function(req,res,next){
    res.render('./eventorgstuff/addevent');
});

//10 EventOrg edit event add see attendee list
router.get('/eventdetail/:id',EVO_Login,function(req,res,next){
    /*
    req.event.findOne({_id :req.params.id} ,function(e,docs){
        res.render('',{currentUser : req.user,event: docs})
    })
    */
    res.render('');
});

//11 EventOrg want to see 
router.get('/attendeelist/:id',EVO_Login,function(req,res,next){
    /*
    req.event.findOne({_id :req.params.id}, 'reservation' ,function(e,docs){
        res.render('',{currentUser : req.user,event: docs})
    })
    */
    res.render('');
});

function EVO_Login(req, res, next) {
    if (req.isAuthenticated() && req.user.type == 'eventorg') {
        return next();
    } else {
        res.render("denied");
    }
}

module.exports = router;