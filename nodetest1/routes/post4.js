var express               = require('express'),
    router                = express.Router(),
    passport              = require('passport');
    User                  = require('./users');


//23 Event Org Edit profile
router.post('/editeventorgprofile',function(req,res){
    req.evo.findOneAndUpdate({username : req.user.username},
        {
            Name: req.body.name,
            Tel: req.body.tel,
            Email: req.body.email,
        } ,function(e,docs){
        res.redirect("/myprofile");
    });
});

//24 Event Org Edit profile pic
router.post('/editeventorgpic',function(req,res){
    req.evo.findOneAndUpdate({username : req.user.username},{ImgLink:req.body.link} ,function(e,docs){
        res.redirect("/myprofile");
    });

});

//25 Event Org add event
router.post('/addevent',function(req,res){
    var newEvent = new req.event({
        username: req.user.username,
        Ename: req.body.name,
        Category: req.body.category,
        Detail: req.body.detail,
        Price: req.body.price,
        MaxSeat: req.body.seat,
        Location: req.body.location,
        Exp: new Date(req.body.exp + "GMT+07:00"),
        Contact: req.body.contact,
        Boost: false,
        ImgLink: req.body.link,
        reservation: []
    });
    newEvent.save(function(e){
        if (e) console.log(e);
    })
    req.evo.findOneAndUpdate(
        { username: req.user.username },
        { $push: { MyEvent: newEvent._id } },function(e){
    });
    req.atd.find({},function(e,docs){
        for (i in docs){
            req.transport.sendMail({
                from: 'blueentry.se@gmail.com',
                to: docs[i].Email,
                subject: 'New Event: '+newEvent.Ename,
                text: 'Event Name: '+newEvent.Ename+'\nDetail: '+newEvent.Detail+'\nPrice: '+newEvent.Price
              });
        }
    })
    res.redirect('/');
});

//26 Event Org boost event
router.post('/boost',function(req,res){
    req.event.findOneAndUpdate({_id: req.body.id},{Boost: true}, function(e){
        if(e) console.log(e)
        res.redirect("/myevent");
    });
});

//27 Event Org edit event
router.post('/editevent',function(req,res){
    req.event.findOneAndUpdate({_id : req.body.id},
        {
            Ename: req.body.ename,
            Category: req.body.category,
            Detail: req.body.detail,
            Price: req.body.price,
            MaxSeat: req.body.maxseat,
            Location: req.body.location,
            Exp: new Date(req.body.exp + "GMT+07:00"),
            Contact: req.body.contact,
        } ,function(e,docs){
            res.redirect("/eventdetail/"+req.body.id);
    });
});

//28 Event Org valid Attendee's receipt
router.post('/validreceipt',function(req,res){
    req.reserve.findOneAndUpdate({_id : req.body.id}, {Valid: true} ,function(e,docs){
        req.atd.findOne({username: docs.Reserver}, function(e,docs2){
            req.transport.sendMail({
                from: 'blueentry.se@gmail.com',
                to: docs2.Email,
                subject: 'Reservation success',
                text: 'Your evidence has been confirmed by Event Organizer.\nThank you for joining our event.'
              });
        });
        res.redirect("/eventdetail/"+req.body.eid);
    });
});

module.exports = router;
