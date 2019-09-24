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
  let totalWeightage = 0, scoredWeightage = 0, incorrectTags = [];
  const attendedQuestions = [];

  Question.find({})
    .then(questions => {
  
      questions.map(correctQuestion => {
        totalWeightage += correctQuestion.weightage
        userAnswers.find(userAnswer => {
          if(userAnswer._id == correctQuestion._id) {
            if(userAnswer["answer"] == correctQuestion["answer"]) {
              scoredWeightage += userAnswer.weightage;
              attendedQuestions.push(correctQuestion);
              return true;
            } else {
              const incorrectTag = correctQuestion.tags[0];
              incorrectTags.push(incorrectTag);
              attendedQuestions.push({
                ...correctQuestion._doc,
                userPick: userAnswer.answer
              })
              return false;
            }
          }
          return false;
        });
      });

      res.status(200).json({
        totalWeightage: totalWeightage,
        scoredWeightage: scoredWeightage,
        attendedQuestions: attendedQuestions,
        incorrectTags: incorrectTags.filter((tag, i) => incorrectTags.indexOf(tag) == i)
      });
    })
})

// @route POST /api/question/add
// Add question to DB (from mcq_20.js)
router.get("/addall", async (req, res) => {

  await ques.map( async q => {
    await new Question({
      question: q.question,
      options: q.options,
      answer: q.answer,
      weightage: q.weightage,
      tags: q.tags
    })
      .save()
      .then(que => console.log(que));
  });
  res.status(200).json({ "OK": true })
});

module.exports = router;