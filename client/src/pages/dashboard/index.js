import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import QuestionsContainer from "../../components/Questions";
import Controls from "../../components/Questions/Controls";
import SubmitDashboard from "../../components/Questions/Submit";

const Dashoard = props => {
  const { questionReducer } = props;

  if(Object.keys(questionReducer.results).length > 0) return <Redirect to="/dashboard/report" />

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center flex-column">
            <QuestionsContainer />
          </div>
          <div className="col-md-4">
            <Controls />
            <SubmitDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  questionReducer: state.questionReducer
})

export default connect(mapStateToProps)(Dashoard);