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
          if(req.body.type == 'attendee'){
            var atd = req.atd;
            var newatd = new atd({
                username: req.body.username,
                Fname: req.body.fname,
                Lname: req.body.lname,
                Tel: req.body.tel,
                Email: req.body.email,
                DOB: req.body.dob,
                Gender: req.body.gender,
                Credit: [],
                MyReserve: [],
                ImgLink: ""
            });
            newatd.save(function(e){
                if (e) {
                    console.log(e)
                }
            });
          }else{
            var evo = req.evo;
            var newevo = new evo({
                username: req.body.username,
                Name: req.body.name,
                Tel: req.body.tel,
                Email: req.body.email,
                MyEvent: [],
                ImgLink: ""
            });
            newevo.save(function(e){
                if (e) {
                    console.log(e)
                }
            });
          }
          res.redirect('/');
      });
    });
});

//12 Attendee and Event Org logout
//router.post('/logout',function(req,res){
//});
  

    
module.exports = router;
