var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

//7 myprofile
router.get('/myprofile',isLoggedIn,function(req,res,next){
    res.render('myprofile',{currentUser:req.user});
});

//8 myevent
router.get('/myevent',isLoggedIn,function(req,res,next){
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