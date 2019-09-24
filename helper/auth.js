const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/keys")

module.exports = {
  /** 
    * @desc Middleware to check for the authorisation of a user using JWT in the request header [x-auth-token].
  */
  authorisation: function(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization Denied" });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (e) {
      res.status(400).json({ msg: "Invalid Token" });
    }
  }
}