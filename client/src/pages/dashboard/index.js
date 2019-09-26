import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import QuestionsContainer from "../../components/Questions";
import Timer from "../../components/Timer";
import Controls from "../../components/Questions/Controls";
import UserDetails from "../../components/Questions/UserDetails";
import Instructions from "../../components/Dialog/Instructions";
import TimeUp from "../../components/Dialog/TimeUp";
import { checkTimer } from "../../actions/timerAction";

const Dashoard = props => {
  const { questionReducer, checkTimer } = props;
  
  useEffect(() => {
    checkTimer();
  }, [checkTimer]);

  if(Object.keys(questionReducer.results).length > 0) return <Redirect to="/dashboard/report" />

  return (
    <div className="dashboard">
      <Timer />
      <TimeUp />
      <div className="container">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center flex-column">
            <QuestionsContainer />
          </div>
          <div className="col-md-4">
            <Controls />
            <UserDetails />
          </div>
        </div>
      </div>
      <Instructions />
      
    </div>
  );
}

const mapStateToProps = state => ({
  questionReducer: state.questionReducer
})

export default connect(mapStateToProps, { checkTimer })(Dashoard);