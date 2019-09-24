import React from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

function Loading(props) {
  return props.appState.loading && <div className="loading d-flex align-items-center justify-content-center">
    <CircularProgress thickness={5} size={60} />
  </div>;
}

const mapStateToProps = state => ({
  appState: state.appStateReducer
})

export default connect(mapStateToProps, {})(Loading)