import React from "react";
import { connect } from "react-redux";
import { stopTimer } from "../../actions/timerAction";

function Timer(props) {
  const { timer: { timeLeft, isRunning }, stopTimer } = props;
  
  if(timeLeft <= 0) {
    stopTimer();
  }

  const padZero = number => {
    return number < 10 ? `0${number}` : number
  }

  const toMinutes = seconds => {
    return `${Math.floor(seconds / 60)}:${padZero(Math.floor(seconds % 60))}`;
  }

  return isRunning &&
    <div className="timer-container">
      <p>Time left {toMinutes(timeLeft)}</p>
    </div>
}

const mapStateToProps = state => ({
  timer: state.timerReducer
});

export default connect(mapStateToProps, { stopTimer })(Timer);
