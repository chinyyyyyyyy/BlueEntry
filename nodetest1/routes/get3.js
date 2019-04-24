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
    if (req.user.type == "attendee"){
        req.reserve.find({Reserver : req.user.username}, function(e,docs){
            var eid = []
            for (i in docs){
                eid.push(docs[i].Event)
            }
            req.event.find({"_id": {$in: eid}},function(e,docs2){
                eid2 = [];
                for (j in docs){
                    for(k in docs2){
                        if(String(docs[j].Event) == String(docs2[k]._id)){
                            eid2.push(docs2[k].Ename);
                        }
                    }
                }
                console.log(eid2);
                res.render('./attendeestuff/atdevent',{currentUser:req.user ,myevent:docs , ename:eid2});
            });
        });
    } else {
        req.evo.findOne({username : req.user.username}, function(e,docs){
            req.event.find({_id: {$in: docs.MyEvent}},function(e,docs2){
                res.render('./eventorgstuff/evoeventlist',{currentUser:req.user ,myevent:docs2});
            });
        }) ;
    }
});

router.get('/reservedetail/:id',isLoggedIn,function(req,res,next){
    req.reserve.findOne({"_id": req.params.id},function(e,docs){
        if(docs.Reserver == req.user.username){
            req.event.findOne({"_id": docs.Event},function(e,docs2){
                res.render('./attendeestuff/atdreserveedit',{currentUser:req.user ,reserve:docs,event:docs2})
            });
        }else{
            res.render("denied")
        }
    });
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.render("denied");
    }
}

module.exports = router;