const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  options: [],
  answer: String,
  weigtage: Number
});

const question = mongoose.model("questions", questionSchema);
module.exports = question;