var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

//11 Atyendee and Event Org login
router.post('/login',passport.authenticate("local",{
    successRedirect: "/myprofile",
    failureRedirect: "/login"
}),function(req,res,next){
});

//12 Atyendee and Event Org Register
router.post('/register',function(req,res){
    User.register(new User({username: req.body.username,type: req.body.type}), req.body.password, function(err,user){
      if(err){
          console.log(err);
          return res.redirect('/register');
      }
      passport.authenticate("local")(req,res,function(){
          res.redirect('/register');
      });
    });
});

//12 Atyendee and Event Org logout
router.post('/logout',function(req,res){

});
  

    
module.exports = router;
