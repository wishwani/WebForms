 var mongoose = require("mongoose");
 var bcrypt = require("bcrypt-nodejs");
 var SALT_FACTOR = 10;
 var Schema = mongoose.Schema;
 
 var UserSchema = new Schema({ 
     username:String,
     _id:String,
     dateOfBirth:Date,
     telephoneNo:Number,
     address:String,
     email:String,
     fb_Id:String,
     jobTitle:String,
     password:String,
     imageURL:String
 });

 var noop = function() {};
UserSchema.pre("save", function(done) {
var user = this;
if (!user.isModified("password")) {
return done();
}
bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
if (err) { return done(err); }
bcrypt.hash(user.password, salt, noop,
 function(err, hashedPassword) {
if (err) { return done(err); }
user.password = hashedPassword;
done();
});
});
});

UserSchema.methods.checkPassword = function(guess, done) {
bcrypt.compare(guess, this.password, function(err, isMatch) {
done(err, isMatch);
});
};
UserSchema.methods.name = function() {
return this.displayName || this.username;
};

 module.exports=mongoose.model('User',UserSchema);
