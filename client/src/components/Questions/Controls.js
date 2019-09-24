import React from "react";
import { connect } from "react-redux";
import Fab from '@material-ui/core/Fab';
import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { setCurrentIndex, submitAnswers, setCurrentChoice } from "../../actions/questionAction";

function Controls(props) {
  const { questionReducer, setCurrentIndex, submitAnswers, setCurrentChoice } = props;
  const { questions, currentIndex } = questionReducer;

  const handleClick = index => {
    setCurrentChoice("");
    setCurrentIndex(index)
  }

  return (
    <div className="card controls d-flex flex-column align-items-center">
      <h4>Questions</h4>
      <div className="questions-selector">
        {questions.map((question, index) => {
          return <Fab
            key={index} 
            style={{ 
              backgroundColor: question["answer"] ? green["300"] : grey["50"],
              border: currentIndex === index ? `1px solid ${blue.A200}` : null
            }}
            size="small" 
            color="secondary"
            className="index-btn"
            onClick={() => handleClick(index)}
          >
            {index + 1}
          </Fab>
        })}
      </div>
      <Fab 
        style={{ backgroundColor: green["400"], color: grey["50"], margin: "20px 0" }}
        variant="extended"
        color="secondary"
        onClick={() => submitAnswers()}
      >
        <CheckCircleRounded style={{ marginRight: 12 }} />
        Submit
      </Fab>
    
    </div>
  );
}

const mapStateToProps = state => ({
  questionReducer: state.questionReducer
})

export default connect(mapStateToProps, { setCurrentIndex, submitAnswers, setCurrentChoice })(Controls);