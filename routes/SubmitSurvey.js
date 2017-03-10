var mongoose = require('mongoose');   
var express = require('express');
var router = express.Router();
var app = express();
var Survey = require('../models/Survey');
var ESurvey = require('../models/ESurvey');
var MCQReply = require('../models/MCQReply');
var EssayReply = require('../models/EssayReply');
var cookieParser = require('cookie-parser');

router.use(cookieParser());

 router.post("/saveMCQAnswers", function(req, res) {

   MCQReply.findOne({_id : req.body.surveyId}, function(err,doc){
        if(err) console.log(err);
        // if the survey isn't there `doc` will be null then do your save
        if(!doc){
          new MCQReply({

           _id : req.body.surveyId,
            surveyname: req.body.surveyId,
            replies :[{
              replierId : req.cookies.LoggedInUser,
              answers : req.body.answers  
            }]

            }).save(function(err, doc){
              if(err) res.json(err);
              else
              req.flash('success_msg', 'User registered to Database');  
              res.redirect("/");

            });                 
        }else{
            //you get mongoose document
            doc.replies.push({replierId : "R002", answers : [{questionId : "A002", answer : "A001"}]});

            //dont forget to save
            doc.save(function(err, doc){
              if(err) res.json(err);
              else
              req.flash('success_msg', 'User registered to Database');  
              res.redirect("/fillQBank");
              
            });
        }


    });

 });

  router.post("/saveEssayAnswers", function(req, res) {

   EssayReply.findOne({_id : req.body.surveyId}, function(err,doc){
        if(err) console.log(err);
        // if the survey isn't there `doc` will be null then do your save
        if(!doc){
          new EssayReply({

           _id : req.body.surveyId,
            surveyname: req.body.surveyName,
            replies :[{
              replierId : req.cookies.LoggedInUser,
              answers :  req.body.answers
            }]

            }).save(function(err, doc){
              if(err) res.json(err);
              else
              req.flash('success_msg', 'User registered to Database');  
              res.redirect("/");

            });                 
        }else{
            //you get mongoose document
            doc.replies.push({replierId : req.cookies.LoggedInUser, answers : req.body.answers});

            //dont forget to save
            doc.save(function(err, doc){
              if(err) res.json(err);
              else
              req.flash('success_msg', 'User registered to Database');  
              res.redirect("/fillQBank");
              
            });
        }


    });
// console.log("hvcgjasvcj");
 });

router.get('/:_id', function (req, res) {
  Survey.findOne({_id:req.params._id}, function ( err, survey, count ){
      res.render( 'Pages/submitSurveyQuestions', {
        survey : survey
      });
    }); 
});

router.get('/ESurvey/:_id', function (req, res) {
  ESurvey.findOne({_id:req.params._id}, function ( err, esurvey, count ){
      res.render( 'Pages/submitESurveyQuestions', {
        esurvey : esurvey
      });
    }); 
});

router.get('/testt/:_id', function(req, res) {
  Survey.findOne({_id:req.params._id}, function ( err, survey, count ){
      res.render( 'Pages/submitSurveyQuestions', {
        survey : survey
      });
    }); 
 });

	  
module.exports = router;
