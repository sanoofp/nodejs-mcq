import React from "react";
import { connect } from "react-redux";
import { stopTimer } from "../../actions/timerAction";

function Timer(props) {
  const { timer: { timeLeft, isRunning }, stopTimer } = props;
  
  if(timeLeft <= 0) {
    stopTimer();
  }

  const toMinutes = seconds => {
    return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)}`;
  }

  return isRunning &&
    <div className="timer-container">
      <p>{toMinutes(timeLeft)}</p>
    </div>
}

const mapStateToProps = state => ({
  timer: state.timerReducer
});

export default connect(mapStateToProps, { stopTimer })(Timer);
