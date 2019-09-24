import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { loadQuestions, setCurrentQuestion, setCurrentChoice } from "../../actions/questionAction";
import QuestionsCard from "../../components/Questions/Card";

function QuestionsContainer(props) {
  // const [ currentChoice, setCurrentChoice ] = useState("")
  
  const { questionsReducer, loadQuestions, setCurrentQuestion, setCurrentChoice } = props
  const { currentIndex, questions, currentChoice } = questionsReducer;
  
  const currentQuestion = questions[currentIndex];
  
  useEffect(() => { 
    if(questions.length === 0) {
      loadQuestions();
    }
    // For refereance : https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNext = idx => {
    idx = idx + 1;
    console.log("HANDLE NEXT FIRED");
    if(idx <= questions.length) {
      currentQuestion["answer"] = currentChoice;
      setCurrentQuestion(idx, currentQuestion)
      setCurrentChoice("")
    }
  } 
  const handleChange = option => {
    console.log(currentQuestion);
    setCurrentChoice(option)
  };  

  return currentQuestion ? 
    <React.Fragment>
      <QuestionsCard
        handleChange={e => handleChange(e.target.value)}
        choice={currentChoice}
        index={currentIndex}
        currentQuestion={currentQuestion}
      />    
      <Button 
        color="primary"
        variant="contained"
        fullWidth
        className="next-btn"
        onClick={() => handleNext(currentIndex)}
        disabled={currentChoice.length === 0}
      >
        Next
      </Button>
    </React.Fragment>
    : 
    <div className="card dashboard-info">
      <h4>Select a question, to view or Submit your answer</h4>
    </div>
}

const mapStateToProps = state => ({
  questionsReducer: state.questionReducer
})

export default connect(mapStateToProps, { loadQuestions, setCurrentQuestion, setCurrentChoice })(QuestionsContainer);