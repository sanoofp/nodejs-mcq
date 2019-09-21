const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registered_date: {
    type: Date,
    default: Date.now
  }
});

const user = mongoose.model("users", userSchema);
module.exports = user;