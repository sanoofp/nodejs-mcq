const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/keys")

module.exports = {
  authorisation: function(req, res, next) {
    console.log("REQUEST HEADERS ::: ", req.headers);
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