const router = require("express").Router();
const Question = require("../model/Question")
const { ques } = require("../mcq_20")

// @route POST /api/question/add
// Add question to DB
router.get("/addall", (req, res) => {

  const resArr = []
  ques.map(q => {
    new Question({
      question: q.question,
      options: q.options,
      answer: q.answer,
      weightage: q.weightage
    })
      .save()
      .then(que => {
      });
  });
  res.status(200).json(resArr)
});

module.exports = router;