var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

    
//1 home
router.get('/',function(req,res,next){
  /*
  var eve = req.eve
  var user;
  if (req.user == null){
    user = "kuy";
  } else {
    user = req.user;
  }
  eve.find({}, function(e,docs){
    var boostlist = [];
    for(var i in docs){
      if(docs[i].boost == "1"){
        boostlist.append(docs[i]);
      }
    }
    res.render('./general/index',{currentUser:user ,allevent:docs ,boosted_event:boostlist});
  });
  */
  res.render('./general/index',{currentUser:req.user/*allevent:docs ,boosted_event:boostlist*/});
});

//2 eventpage
router.get('/events/:id', function (req, res) {
  var eve = req.eve;
  var user;
  if (req.user == null){
    user = "kuy";
  } else {
    user = req.user;
  }
  eve.findOne({_id:req.params.id}, function (e, docs) {
  res.render('eventpage', { currentUser:user ,"event": docs });
});
});

//3 serch result
router.get('/results/q=:key&cat=:cat&pstart=:pstart&pend=:pend', function (req, res) {
    var listcat = ['ComSci', 'Finance', 'HomeEcon', 'Life', 'Culture'];
    var eve = req.eve;
    var pstart = Number(req.params.pstart);
    var pend = Number(req.params.pend);
    var key = req.params.key;
    if (req.user == null){
      user = "kuy";
    } else {
      user = req.user;
    }
    if (req.params.cat != 'allcat') {
      listcat = [req.params.cat];
    }
    if (key == "''") {
      eve.find({ $and: [{ Price: { $gte: pstart, $lte: pend } }, { Category: { $in: listcat } }] }, function (e, docs) {
        res.render('results', {  currentUser:user ,"userlist": docs });
      });
    } else {
      eve.find({ $and: [{ $text: { $search: key } }, { Price: { $gte: pstart, $lte: pend } }, { Category: { $in: listcat } }] }, function (e, docs) {
        res.render('results', {  currentUser:user ,"userlist": docs });
      });
  }
});



module.exports = router;
