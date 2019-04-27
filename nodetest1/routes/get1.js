var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

    
//1 home
router.get('/',function(req,res,next){
  req.event.find({}, function(e,docs){
    req.event.find({Boost:true}, function(e,docs2){
      res.render('./general/home',{currentUser:req.user ,allevent:docs ,boosted_event:docs2});
      });
    });
});

//2 eventpage
router.get('/events/:id', function (req, res) {
  req.event.findOne({_id:req.params.id}, function (e, docs) {
    if (req.user!=null){
      if(req.user.type == 'attendee'){
        req.atd.findOne({username: req.user.username},'Credit',function(e,docs2){
          res.render('./general/eventpage', { currentUser:req.user ,"event": docs ,"credit": docs2.Credit});
        });
      }else{
        res.render('./general/eventpage', { currentUser:req.user ,"event": docs });
      }  
    }else{
        res.render('./general/eventpage', { currentUser:req.user ,"event": docs });
    }
  });
});

//3 serch result
router.get(['/results/q=:key&cat=:cat&pstart=:pstart&pend=:pend','/results/q=&cat=:cat&pstart=:pstart&pend=:pend'], function (req, res) {
    var listcat = ['ComSci', 'Finance', 'HomeEcon', 'Life', 'Culture','others'];
    var pstart = Number(req.params.pstart);
    var pend = Number(req.params.pend);
    var key = "";
    if(req.params.key!=null){
      key = req.params.key;
    }
    if (req.params.cat != 'allcat') {
      listcat = [req.params.cat];
    }
    if (key == "") {
      req.event.find({ $and: [{ Price: { $gte: pstart, $lte: pend } }, { Category: { $in: listcat } }] }, function (e, docs) {
        res.render('./general/resultpage', {currentUser:req.user ,"userlist": docs,request:{"key":key,"cat":listcat,"pstart":pstart,"pend":pend}});
      });
    } else {
      req.event.find({ $and: [{ Ename: { $regex: key ,$options: 'i'} }, { Price: { $gte: pstart, $lte: pend } }, { Category: { $in: listcat } }] }, function (e, docs) {
        res.render('./general/resultpage', {currentUser:req.user ,"userlist": docs,request:{key:key,cat:listcat,pstart:pstart,pend:pend}});
      });
  }
});



module.exports = router;
