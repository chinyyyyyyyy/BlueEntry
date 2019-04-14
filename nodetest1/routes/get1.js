var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

    
//1 home
router.get('/',function(req,res,next){
  
  res.render('./general/index',{currentUser:req.user, /*allevent:docs ,boosted_event:boostlist*/});
});

//2 eventpage
router.get('/events/:id', function (req, res) {
  var eve = req.eve;
  eve.findOne({_id:req.params.id}, function (e, docs) {
  res.render('eventpage', { currentUser:req.user,"event": docs });
});
});

//3 serch result
router.get('/results/q=:key&cat=:cat&pstart=:pstart&pend=:pend', function (req, res) {
    var listcat = ['ComSci', 'Finance', 'HomeEcon', 'Life', 'Culture'];
    var eve = req.eve;
    var pstart = Number(req.params.pstart);
    var pend = Number(req.params.pend);
    var key = req.params.key;
    if (req.params.cat != 'allcat') {
      listcat = [req.params.cat];
    }
    if (key == "''") {
      eve.find({ $and: [{ Price: { $gte: pstart, $lte: pend } }, { Category: { $in: listcat } }] }, function (e, docs) {
        res.render('results', { "userlist": docs });
      });
    } else {
      eve.find({ $and: [{ $text: { $search: key } }, { Price: { $gte: pstart, $lte: pend } }, { Category: { $in: listcat } }] }, function (e, docs) {
        res.render('results', { "userlist": docs });
      });
  }
});



module.exports = router;
