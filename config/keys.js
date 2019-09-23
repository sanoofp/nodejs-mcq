const config = require("config");

if(process.env.NODE_ENV === "production") {
  module.exports = {
    "JWT_SECRET": process.env.JWT_SECRET,
    "MONGO_URI": process.env.MONGO_URI,
    "GOOGLE_CLIENT_ID": process.env.GOOGLE_CLIENT_ID,
    "GOOGLE_CLIENT_SECRET": process.env.GOOGLE_CLIENT_SECRET
  }
} else {
  module.exports = {
    JWT_SECRET: config.get("JWT_SECRET"),
    MONGO_URI: config.get("MONGO_URI"),
    GOOGLE_CLIENT_ID: config.get("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: config.get("GOOGLE_CLIENT_SECRET"),
  }
}