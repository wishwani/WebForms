var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

 router.post('/', function(req, res,next){
  new User({
     username: req.body.username,
     _id:req.body.eid,
     dateOfBirth:req.body.dob,
     telephoneNo:req.body.tp,
     address:req.body.address,
     email:req.body.email,
     fb_Id:req.body.fbid,
     jobTitle:req.body.job,
     password:req.body.password,
     imageURL:"profilePic_"+req.body.username
      
    }).save(function(err, doc){
      if(err) res.json(err);
      else
      req.flash('success_msg', 'User registered to Database');  
      res.redirect("/AdminDatabase/register");
      
    });
});

router.get('/viewUser', function (req, res) {
  User.find({}, function ( err, users, count ){
      res.render( 'Pages/viewUser', {
        users : users
      });
    }); 
});

router.get('/viewUser/:ID', function (req, res) {
  User.findOne({_id:req.params.ID}, function ( err, users, count ){
      res.render( 'Pages/viewUserDetails', {
        users : users
      });
    }); 
});

router.get('/viewUser/updateEmployee/:ID', function (req, res) {
  User.findOne({_id:req.params.ID}, function ( err, users, count ){
      res.render( 'Pages/updateEmployee', {
        users : users
      });
    }); 
});

router.post('/viewUser/updateEmployee/:ID', function(req, res,next){
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
         if(req.body.password){
          user.password = req.body.password;
        }


        user.save(function(err, updateUser){
          if(err){
            res.json(err);
          }else{
            req.flash('success_msg', 'User updated');  
            res.redirect("/AdminDatabase");
        }
        });
      }
    }
  });
});

router.post('/viewUser/updateEmployee/delete/:ID', function (req, res) {
  User.findByIdAndRemove(req.params.ID, function (err, user) {  
    var response = {
        message: "User successfully deleted",
        id: user._id
    };
    res.render('Pages/AdminDatabase');
});
});

router.get("/register", function(req, res) {
   res.render('Pages/register', { title: 'register' });
 });

module.exports = router;
