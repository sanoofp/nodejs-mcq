const router = require("express").Router();
const Question = require("../model/Question")
const { ques } = require("../mcq_20")
const { shuffle } = require("../helper/array")
const { authorisation } = require("../helper/auth")

// @route GET /api/question
// Get all questions
router.get("/", authorisation, (req, res) => {
  Question.find({})
    .select("-answer")
    .then(questions => {
      questions = shuffle(questions)
      res.status(200).json(questions);
    })
})

// @route GET /api/question/evaluate
// Evaluate question and generates report
router.post("/evaluate", authorisation, (req, res) => {
  const userAnswers = req.body.questions;
  let totalWeightage = 0, scoredWeightage = 0;

  Question.find({})
    .then(questions => {
      questions.map(correctQuestion => {
        totalWeightage += correctQuestion.weightage
        userAnswers.find(userAnswer => {
          if(userAnswer["answer"] == correctQuestion["answer"]) {
            scoredWeightage += userAnswer.weightage;
            return true;
          }
          return false;
        })
      });

      console.log("TOTAL MARK :: ", totalWeightage, " : GOT :", scoredWeightage);

      res.status(200).json({
        totalWeightage: totalWeightage,
        scoredWeightage: scoredWeightage
      });
    })
})

// @route POST /api/question/add
// Add question to DB
router.get("/addall", async (req, res) => {

  const resArr = []
  await ques.map( async q => {
    await new Question({
      question: q.question,
      options: q.options,
      answer: q.answer,
      weightage: q.weightage
    })
      .save()
      .then(que => console.log(que));
  });
  res.status(200).json(resArr)
});

module.exports = router;