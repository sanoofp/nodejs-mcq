const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const cookieExtractor = function(req) {
  const token = null;
  if (req && req.cookies) {
    token = req.cookies['x-auth-token'];
  }
  return token;
};

passport.use(new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallack: true
}, function (jwtPayload, done) {
  User.findById(jwtPayload.id)
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
    });

}));

passport.use(new LocalStrategy({
  usernameField: 'email'
}, function (email, password, done) {
  User
    .findOne({email: email})
    .then(user => {
      if (!user) 
        return done(null, false, {message: `No user found with email ${email}`});
      
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) 
          throw err;
        
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, {message: 'Incorrect password'});
        }

      });
    });
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User
    .findById(id, function (err, user) {
      done(err, user);
    });
});

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
}))