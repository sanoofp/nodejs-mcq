import React, { useState, useEffect } from "react";
import { loadQuestions, setCurrentQuestion } from "../../actions/questionAction";
import QuestionsCard from "../../components/Questions/Card";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

function QuestionsContainer(props) {
  const { questionsReducer, loadQuestions, setCurrentQuestion } = props

  const { currentIndex, questions } = questionsReducer;
  const currentQuestion = questions[currentIndex];

  const [ currentChoice, setCurrentChoice ] = useState("")
  
  useEffect(() => { 
    if(questions.length === 0) {
      loadQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleIndex = idx => {
    idx = idx + 1;
    if(idx <= questions.length) {
      setCurrentQuestion(idx, currentQuestion)
      setCurrentChoice("")

    }
  } 
  const handleChange = option => {
    currentQuestion["answer"] = option;
    setCurrentChoice(option)
  };  

  return currentQuestion ? 
    <React.Fragment>
      <QuestionsCard
        handleChange={e => handleChange(e.target.value)}
        choice={currentChoice}
        index={currentIndex}
        currentQuestion={currentQuestion}
        alreadyAttended={currentQuestion["answer"]}
      />    
      <Button 
        color="primary"
        variant="contained"
        fullWidth
        className="next-btn"
        onClick={() => handleIndex(currentIndex)}
        disabled={currentChoice.length === 0}
      >
        Next
      </Button>
    </React.Fragment>
    : <div className="card dashboard-info"><h4>Select a question to view or Submit your answer.</h4></div>
}

const mapStateToProps = state => ({
  questionsReducer: state.questionReducer
})

export default connect(mapStateToProps, { loadQuestions, setCurrentQuestion })(QuestionsContainer);