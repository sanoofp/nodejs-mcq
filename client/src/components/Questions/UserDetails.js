import React from "react";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";

function UserDetails(props) {
  const { questionReducer, auth } = props;
  const { questions } = questionReducer
  let attendedCount = 0;
  questions.map(question => question["answer"] ? attendedCount++ : null);

  return (
    <div className="submit-dashboard card">
      <div className="container">
        <h3>User</h3>
        <h4 className="d-flex align-items-center justify-content-center">
          <img src={auth.user.imageUrl} alt="User-img" />
          {auth.user.username}
        </h4>
        <div className="row d-flex align-items-center jutify-content-center flex-wrap">
          <div className="col-md-6">
            <p>
              Completed <br/> { attendedCount } of { questions.length }
            </p>
          </div>
          <div className="col-md-6">
          <LinearProgress variant="determinate" value={(attendedCount * 100) / questions.length} />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.authReducer,
  questionReducer: state.questionReducer
})

export default connect(mapStateToProps)(UserDetails);