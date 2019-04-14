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

//Special
router.get('/logout',isLoggedIn,function (req, res) {
    req.logout();
    setTimeout(function () {
        res.redirect("/login");
    }, 1500);
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.render("denied");
    }
}

function isntLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.render("denied");
    }
}



module.exports = router;