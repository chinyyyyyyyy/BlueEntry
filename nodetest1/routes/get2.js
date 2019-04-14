var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');


//(temp)login
router.get('/login',isntLoggedIn,function(req,res,next){
    res.render('./register/login');
});


//4 main register
router.get('/register',isntLoggedIn,function(req,res,next){
    res.render('./register/register');
});

//5 attendee register
router.get('/attendeeregister',isntLoggedIn,function(req,res,next){
    res.render('');
});

//6 eventorg register
router.get('/eventorgregister',isntLoggedIn,function(req,res,next){
    res.render('');
});

function isntLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.render("denied");
    }
}



module.exports = router;