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
    req.event.findOne({_id :req.params.id} ,function(e,docs){
        if(docs.username == req.user.username){
            res.render('./eventorgstuff/evoeventedit',{currentUser : req.user,event: docs});
        }else{
            res.render('denied');
        }
    });
});

//11 EventOrg want to see 
router.get('/attendeelist/:id',EVO_Login,function(req,res,next){
    req.reserve.find({"Event": req.params.id}, function(e,docs){
        req.event.findOne({_id :req.params.id} ,function(e,doc2){
            if(doc2.username == req.user.username){
                res.render('./eventorgstuff/evoeventatdlist',{currentUser : req.user,reserve: docs});
            }else{
                res.render('denied')
            }
        });
    });
});

function EVO_Login(req, res, next) {
    if (req.isAuthenticated() && req.user.type == 'eventorg') {
        return next();
    } else {
        res.render("denied");
    }
}

module.exports = router;