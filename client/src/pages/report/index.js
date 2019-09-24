import React from "react";
import {connect} from "react-redux";
import PercentageProgress from "../../components/Progress";
import ReportTable from "../../components/Table";
import AnalysisCard from "./AnalysisCard";

const Report = props => {
  const {questionReducer} = props;
  const {results} = questionReducer

  const percentage = (results.scoredWeightage * 100) / results.totalWeightage;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="card report d-flex align-items-center justify-content-center flex-column">
            <h2>Report</h2>
            <div className="percentage">
              <p>Your overall percentage of this test.</p>
              <PercentageProgress percentage={percentage} />
              <h3>{Math.floor(percentage)} %</h3>
            </div>
            <div className="tables">
              <h3>Attended Questions</h3>
              <ReportTable questionsArr={results.attendedQuestions} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <AnalysisCard incorrectTags={results.incorrectTags} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({questionReducer: state.questionReducer})

export default connect(mapStateToProps)(Report);