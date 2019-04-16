var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');

//12 Atyendee and Event Org login
router.post('/login',passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login"
}),function(req,res,next){
});

//13 Atyendee and Event Org Register
router.post('/register',function(req,res){
    User.register(new User({username: req.body.username,type: req.body.type}), req.body.password, function(err,user){
      if(err){
          console.log(err);
          return res.redirect('/register');
      }
      passport.authenticate("local")(req,res,function(){
          if(req.body.type == 'att'){

          }else{
              
          }
          res.redirect('/register');
      });
    });
});

//12 Attendee and Event Org logout
//router.post('/logout',function(req,res){
//});
  

    
module.exports = router;
