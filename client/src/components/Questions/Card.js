import React from "react";
import Radio from '@material-ui/core/Radio';

function QuestionCard(props) {
  const { index,
    currentQuestion, 
    choice, 
    handleChange, 
  } = props;

  return (
    <div className="card card-container d-flex align-items-center flex-column">
      <p>Question {index + 1}</p>
      <h4 className="question">{currentQuestion.question}</h4>
      <div className="options">
        { 
          currentQuestion.options.map((option, key) => 
            <div key={key} className="option">
              <Radio
                onChange={handleChange}
                color={`${currentQuestion["answer"] && currentQuestion["answer"] === option ? "default" : "primary"}`}
                checked={choice === option || currentQuestion["answer"] === option}
                value={option}
                label={option}
              /> <h5>{option}</h5>
            </div>
          )
        }
      </div>
    </div>
  )
}


export default QuestionCard