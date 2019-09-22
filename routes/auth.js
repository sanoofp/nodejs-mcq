const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { localStrategySchema } = require("../helper/validation")
const User = require("../model/User");
const { authorisation } = require("../helper/auth")

// @route GET /api/auth 
// Authorize user
router.get("/", authorisation, (req, res, next) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err))
});


// @route POST /api/auth/signin 
// Signin a user with email and password
router.post("/signin", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if(err || !user) return res.status(400).json(info);
    
    jwt.sign({ id: user.id }, process.env.JWT_SECRET, (err, token) => {
      if(err) throw err;
      res.status(200).json({token: token, user: {
          email: user.email,
          username: user.username
        }
      })
    })

  })(req, res, next);
})

// @route POST /api/auth/signup 
// Signup a user with email
router.post("/signup", (req, res) => {
  const {error, value} = localStrategySchema.validate(req.body);
  if (error) 
    return res.status(400).json(error);
  
  User
    .findOne({email: value.email})
    .then(user => {
      if (user) 
        return res.status(400).json({message: "User already exist"})
      const newUser = new User({username: value.username, email: value.email, password: value.password});

      // Mongoose pre.save middleware will hash the password
      newUser
        .save()
        .then(user => {
          jwt.sign({
            id: user.id
          }, process.env.JWT_SECRET, (err, token) => {
            if (err) 
              throw err;
            
            res
              .status(200)
              .json({token: token, user: {
                email: user.email,
                username: user.username
              }})
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
});


module.exports = router;