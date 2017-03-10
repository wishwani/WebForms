var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var Survey = require('../models/Survey');
var ESurvey = require('../models/ESurvey');
var QBank = require('../models/QBank');
var User = require('../models/user');
var EssayReply = require('../models/EssayReply');
var async = require('async');
var cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/', function(req, res, next){
     new Survey({
     surveyname: req.body.surveyname,
     _id: req.body.surveyId,
     createrName : req.cookies.LoggedInUser,
     takers : [{
      takerName : req.cookies.LoggedInUser
     }],
     question  : req.body.question
      
    }).save(function(err, doc){
      if(err) res.json(err);
      else
      req.flash('success_msg', 'User registered to Database');  
      res.redirect("/CreateSurvey");
      
    });
});

router.post('/ESurvey', function(req, res, next){
    new ESurvey({
     surveyname: req.body.surveyname,
     _id: req.body.surveyId,
     createrName : req.cookies.LoggedInUser,
     takers : [{
      takerName : req.cookies.LoggedInUser
     }],
     question: req.body.quevalue
      
    }).save(function(err, doc){
      if(err) res.json(err);
      else
      req.flash('success_msg', 'User registered to Database');  
      res.redirect("/CreateSurvey");
      
    });

});

router.get('/viewESurvey/viewESurveyReplies/:_id', function (req, res) {
   EssayReply.findOne({_id:req.params._id}, function ( err, repliedUsers, count ){
      res.render('Pages/viewESurveyRepliedUser', {
        repliedUsers : repliedUsers
      });
    });         
});

router.get('/viewESurvey/viewESurveyReplies/viewESurveyRepliedUser/R001', function (req, res) {
   EssayReply.findOne({_id:'R001'}, function ( err, userReply, count ){
      res.render('Pages/viewESurveyRepliedUserReply', {
        userReply : userReply
      });
    });         
});

router.post('/fillQBank', function(req, res, next){
     new QBank({
     className: req.body.className,
     _id: req.body.classId,
     question  : req.body.question
      
    }).save(function(err, doc){
      if(err) res.json(err);
      else
      req.flash('success_msg', 'User registered to Database');  
      res.redirect("/fillQBank");
      
    });
});

router.get('/viewESurvey/viewESurveyReplies', function (req, res) {
   EssayReply.find({}, function ( err, replies, count ){
      res.render('Pages/viewESurveyReplies', {
        replies : replies
      });
    });           
});

// router.get('/viewESurvey/viewESurveyReplies/:ID', function (req, res) {
//    EssayReply.findOne({_id:req.params.ID}, function ( err, repliedUsers, count ){
//       res.render('Pages/viewESurveyRepliesUser', {
//         repliedUsers : repliedUsers
//       });
//     });           
// });


router.get('/viewSurvey', function (req, res) {
  Survey.find( function ( err, surveys, count ){
      res.render( 'Pages/viewSurvey', {
        surveys : surveys
      });
    }); 
});

router.get('/viewESurvey', function (req, res) {
  ESurvey.find( function ( err, esurveys, count ){
      res.render( 'Pages/viewESurvey', {
        esurveys : esurveys
      });
    }); 
});

router.get('/viewSurvey/:_id', function (req, res) {
  Survey.findOne({_id:req.params._id}, function ( err, survey, count ){
      res.render( 'Pages/viewSurveyQuestions', {
        survey : survey
      });
    }); 
});

router.get('/viewESurvey/:_id', function (req, res) {
  ESurvey.findOne({_id:req.params._id}, function ( err, esurvey, count ){
      res.render( 'Pages/viewESurveyQuestions', {
        esurvey : esurvey
      });
    }); 
});

router.get('/ViewSurvey/viewSurveyQuestions/:_id', function (req, res) {

  var List1Objects = Survey.findOne({_id:req.params._id});
  var List2Objects = User.find({});

   var resources = {
        survey: List1Objects.exec.bind(List1Objects),
        user: List2Objects.exec.bind(List2Objects)
    };

    async.parallel(resources, function (error, results){
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.render('Pages/shareSurvey', results);
    });
  
});

router.get('/viewSurvey/:surveyname/save/receivers', function (req, res) {


});

router.get('/viewSurvey/:surveyname/share/send', function (req, res) {
  var smtpTransport = nodemailer.createTransport({
     service: "Gmail",  // sets automatically host, port and connection security settings
     auth: {
         user: "kumar.kabilesh93@gmail.com",
         pass: " "
     }
  });

  var maillist = 'madhubhani93@gmail.com, harikashan@gmail.com';


  smtpTransport.sendMail({  //email options
     from: "Sender Name <kumar.kabilesh93@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
     to: maillist, // receiver
     subject: "Emailing with nodemailer", // subject
     text: "Hiii! I sent this email to you from nodejs server" // body
  }, function(error, response){  //callback
     if(error){
         console.log(error);
     }else{
         console.log("Message sent: " + response.message);
     }
     
     smtpTransport.close(); 
  });
});




module.exports = router;