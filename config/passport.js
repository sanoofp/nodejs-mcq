const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { cookieExtractor } = require("../helper/auth")

passport.use("jwt", new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
}, function (jwtPayload, done) {
  User.findById(jwtPayload.id)
    .select("-password")
    .then(user => {
      if (!user) return done(null, false, {message: `Invalid Token`});
    
      return done(null, user);
    })
    .catch(err => console.log(err))

}));


passport.use(new LocalStrategy({
  usernameField: 'email',
}, function (email, password, done) {
  User.findOne({ email: email })
    .then(user => {
      if (!user) return done(null, false, {message: `No user found with email ${email}`});
      
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

/* 
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  proxy: true
}, function (accessToken, refreshToken, profile, done) {
  const googleUser = {
    email: profile.emails[0].value,
    username: profile.displayName,
    photo: profile.photos[0].value
  }
  User
    .findOne({email: googleUser.email})
    .then(user => {
      if (user) 
        return done(null, user);
      
      // Create new User
      new User(googleUser)
        .save()
        .then(user => done(null, user));
    })
  return done(null, profile)
})) */