var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var User = require('../models/user');
var ConnectRoles = require('connect-roles');

passport.serializeUser(function(user, done) {
	done(null, user._id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
	done(err, user);
	});
});

passport.use("/", new LocalStrategy(
	 function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false,
				 { message: "No user has that username!" });
			}
			user.checkPassword(password, function(err, isMatch) {
			if (err) { return done(err); }
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false,
				 { message: "Invalid password." });
			}
		});
	});
}));

router.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.errors = req.flash("error");
	res.locals.infos = req.flash("info");
	next();
});

router.post("/", passport.authenticate("/", {
	successRedirect: "/Home",
	failureRedirect: "/",
	session: false,
	failureFlash: true
}));

router.get("/Home", function(req, res) {
   res.render('Pages/Home', { title: 'Home' });
 });

module.exports = router;