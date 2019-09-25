const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/User");

/** 
  * @desc Passport Localstrategy - Signin with email and password and returns the user
  * along with the JWT token signed with user ID
*/
passport.use(new LocalStrategy({
  usernameField: 'email',
}, function (email, password, done) {
  User.findOne({ email: email })
    .then(user => {
      if (!user) return done(null, false, {message: `No user found with email ${email}`});
      if (!user.password) return done(null, false, {message: `User is not signed up with password for ${email}. Please try Google sign in.`});

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, {message: 'Incorrect password'});
        }

      });
    })
    .catch(err => done(err))
  }
));
