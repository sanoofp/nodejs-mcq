import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function QuestionCard(props) {
  const { index, currentQuestion, choice, handleChange, alreadyAttended } = props;

  return (
    <div className="card card-container d-flex align-items-center flex-column">
      <p>Question {index + 1}</p>
      <h4 className="question">{currentQuestion.question}</h4>
      <div className="options">
        <RadioGroup 
          name="options" 
          value={alreadyAttended ? alreadyAttended : choice} 
          onChange={handleChange}
        >
          { 
            currentQuestion.options.map((option, key) => 
              <FormControlLabel
                  key={key}
                  value={option}
                  control={<Radio color="primary" />}
                  label={option}
                  labelPlacement="end"
                />
            )
          }
        </RadioGroup>
      </div>
    </div>
  )
}


export default QuestionCard