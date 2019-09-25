const crypto = require("crypto");
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
  },
  /** 
    * @desc Generate Avatar images from email hash.
    * @param {string} email - Email of the user. (Hash generated from email is used to generate Avatar images).
  */
  generateImageUrl: function(email) {
    const md5Hash = crypto
      .createHash("md5")
      .update(email)
      .digest("hex");
    return `https://www.gravatar.com/avatar/${md5Hash}?s=100&d=identicon`
  }
}