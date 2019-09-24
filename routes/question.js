const router = require("express").Router();
const Question = require("../model/Question")
const { ques } = require("../mcq_20")
const { shuffle } = require("../helper/array")
const { authorisation } = require("../helper/auth")

/**
 * @route GET /api/question
  * @desc Picks all the questions from db 
  * and respond with the questions,
*/
router.get("/", authorisation, (req, res) => {
  Question.find({})
    .select("-answer")
    .then(questions => {
      questions = shuffle(questions)
      res.status(200).json(questions);
    })
})

/**
 * @route GET /api/question/evaluate
  * @desc Evaluate each question from the request 
  * and generate the total weightage mark, 
  * weightage scored by the user and respond with
  * these along with attended question
*/
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
            /*  
              Checks for correct answer and increments the score weightage
              by the required weightage.
              If the answers are incorrect, the tags are puhed into the incorrectTags
              array. 
              [Needs a better algorithm to calculate weightage]
            */
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

/**
 * @route POST /api/question/add
 * @desc Add question to DB (from mcq_20.js)
 * For Development Purpose only - NEEDS TO BE DELETED IN PRODUCTION
*/
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