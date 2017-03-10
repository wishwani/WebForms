var express = require('express');
var router = express.Router();
var Passport = require('./Passport');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var User = require('../models/user');
var Survey = require('../models/Survey');
var ESurvey = require('../models/ESurvey');
var QBank = require('../models/QBank');
var ConnectRoles = require('connect-roles');
var async = require('async');
var cookieParser = require('cookie-parser');
var nodemailer = require("nodemailer");
var MCQReply = require('../models/MCQReply');
var EssayReply = require('../models/EssayReply');

router.use(cookieParser());

router.get('/', function(req, res, next) {
  res.render('Pages/Login', { title: 'Login' });
});




// var user = new ConnectRoles({
//   failureHandler: function (req, res, action) {
//     // optional function to customise code that runs when
//     // user fails authorisation
//     var accept = req.headers.accept || '';
//     res.status(403);
//     if (~accept.indexOf('html')) {
//       res.render('access-denied', {action: action});
//     } else {
//       res.send('Access Denied - You don\'t have permission to: ' + action);
//     }
//   }
// });

// router.use(Passport)
// router.use(user.middleware());

// //anonymous users can only access the home page
// //returning false stops any more rules from being
// //considered
// user.use(function (req, action) {
//   if (!req.isAuthenticated()) return action === 'access home page';
// })

// //moderator users can access private page, but
// //they might not be the only ones so we don't return
// //false if the user isn't a moderator
// user.use('access private page', function (req) {
//   if (req.user.role === 'moderator') {
//     return true;
//   }
// })

// //admin users can access all pages
// user.use(function (req) {
//   if (req.user.role === 'admin') {
//     return true;
//   }
// });


// router.get('/', user.can('access home page'), function (req, res) {
//   res.render('private');
// });
// router.get('/private', user.can('access private page'), function (req, res) {
//   res.render('private');
// });
// router.get('/admin', user.can('access admin page'), function (req, res) {
//   res.render('admin');
// });

// router.get('/AdminDatabase', function(req, res) {
//     User.findOne({_id:"144239J"}, function ( err, users, count ){
//       if(users.jobTitle=="SystemAdmin"){
//         res.render( 'Pages/AdminDatabase', {
//         users : users
//       });  
//       }
//       else{
//          res.redirect("/");
//       } 
       
      
//     }); 
// });


router.get("/Home", function(req, res) {
  User.findOne({username:req.cookies.LoggedInUser}, function ( err, user, count ){
      if(user.jobTitle === 'System Admin'){   
        res.render('Pages/SystemAdminHome');
      }else if(user.jobTitle === 'Survey Admin'){
        res.render('Pages/SurveyAdminHome');
      }
      else if(user.jobTitle === 'Survey Taker'){
        res.render('Pages/SurveyTakerHome');
      }else{
        res.render('Pages/Login');
      }
    }); 
 });

router.get("/About", function(req, res) {
   res.render('Pages/About', { title: 'Home' });
 });

router.get("/Help", function(req, res) {
   res.render('Pages/Help', { title: 'Home' });
 });

router.get("/AdminDatabase", function(req, res) {
   res.render('Pages/AdminDatabase', { title: 'CreateSurvey' });
 });

router.get('/CreateSurvey', function(req, res, next) {
  
  var HealthCare = QBank.findOne({_id:"dfbhdf"});
  var SalaryIssue = QBank.findOne({_id:"dfbhdf"});

   var resources = {
        healthCare: HealthCare.exec.bind(HealthCare),
        salaryIssue: SalaryIssue.exec.bind(SalaryIssue)
    };

    async.parallel(resources, function (error, results){
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.render('Pages/CreateSurvey', results);
    });

});

router.get('/SubmitSurvey', function(req, res, next) {

  var mcqSurvey = Survey.find({ takers: { $elemMatch: { takerName: req.cookies.LoggedInUser } } });
  var eSurvey = ESurvey.find({ takers: { $elemMatch: { takerName: req.cookies.LoggedInUser } } });

   var resources = {
        survey: mcqSurvey.exec.bind(mcqSurvey),
        esurvey: eSurvey.exec.bind(eSurvey)
    };

    async.parallel(resources, function (error, results){
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.render('Pages/SubmitSurvey', results);
    });
});

router.get('/profile', function(req, res) {
  User.findOne({username: req.cookies.LoggedInUser},  function ( err, users, count ){
      res.render( 'Pages/profile', {
        users : users
      });
    });
});

router.get('/profile/updateProfile/:ID', function (req, res) {
  User.findOne({_id:req.params.ID}, function ( err, users, count ){
      res.render( 'Pages/updateProfile', {
        users : users
      });
    }); 
});

 

router.post('/updateProfile/:ID', function(req, res,next){
  User.findOne({_id: req.params.ID}, function (err, user) {
    if(err){
      console.log(err);
      res.status(500).send();
    }else{
      if(!user){
        res.status(404).send();
      }else{
        if(req.body.username){
          user.username = req.body.username;
        }
        if(req.body._id){
          user._id = req.body.eid;
        }
        if(req.body.dob){
          user.dateOfBirth = req.body.dob;
        }
        if(req.body.tp){
          user.telephoneNo = req.body.tp;
        }
        if(req.body.address){
          user.address = req.body.address;
        }
        if(req.body.email){
          user.email = req.body.email;
        }
        if(req.body.fbid){
          user.fb_Id = req.body.fbid;
        }
        if(req.body.job){
          user.jobTitle = req.body.job;
        }

        user.save(function(err, updateUser){
          if(err){
            res.json(err);
          }else{
            req.flash('success_msg', 'User updated');  
            res.redirect("/");
        }
        });
      }
    }
  });
});

router.post("/resetPassword/:username", function(req, res) {
  
User.findOne({username: req.params.username}, function (err, user) {
    if(err){
      console.log(err);
      res.status(500).send();
    }else{
      if(!user){
        res.status(404).send();
      }else{
        if(req.body.username){
          user.username = req.body.username;
        }
         if(req.body.password){
          user.password = req.body.password;
        }

        user.save(function(err, updateUser){
          if(err){
            res.json(err);
          }else{
            req.flash('success_msg', 'User updated');  
            res.redirect("/");
        }
        });
      }
    }
  });

});

router.get("/fillQBank", function(req, res) {
   res.render('Pages/fillQBank', { title: 'CreateSurvey' });
 });

router.get('/viewESurveyReplies', function (req, res) { 
   res.render('ViewESurveyReplies', { title: 'CreateSurvey' });           
});



router.get("/Logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

router.get('/changePassword', function (req, res) {
  var smtpTransport = nodemailer.createTransport({
     service: "Gmail",  // sets automatically host, port and connection security settings
     auth: {
         user: "kumar.kabilesh93@gmail.com",
         pass: "gedegakahi1"
     }
  });

  var maillist = 'kumar.kabilesh93@gmail.com';


  smtpTransport.sendMail({  //email options
     from: "Sender Name <kumar.kabilesh93@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
     to: maillist, // receiver
     subject: "Emailing with nodemailer", // subject
     text: "Hiii! I sent this email to you from nodejs server", // body
     html: '<p>Click <a href="http://localhost:3000/resetPassword">here</a> to reset your password</p>'
  }, function(error, response){  //callback
     if(error){
         console.log(error);
     }else{
         console.log("Message sent: " + response.message);
     }
     
     smtpTransport.close(); 
  });
});

router.get('/resetPassword', function(req, res) {
  User.findOne({username: req.cookies.LoggedInUser},  function ( err, users, count ){
      res.render( 'Pages/resetPassword', {
        users : users
      });
    });
});

module.exports = router;
