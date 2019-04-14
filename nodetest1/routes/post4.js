var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');


//23 Event Org Edit profile
router.post('/editeventorgprofile',function(req,res){

});

//23 Event Org add event
router.post('/addevent',function(req,res){

});

//23 Event Org boost event
router.post('/boost',function(req,res){

});

//23 Event Org edit event
router.post('/editevent',function(req,res){

});

//23 Event Org valid Attendee's receipt
router.post('/validreceipt',function(req,res){

});

module.exports = router;
