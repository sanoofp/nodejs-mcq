import React from "react";
import Fab from "@material-ui/core/Fab";
import ReplayRounded from "@material-ui/icons/ReplayRounded";

export default function ReportActions(props) {
  const { rerun } = props;
  return (
    <div className="report-actions mt-3">
      <Fab
        variant="extended"
        color="primary"
        onClick={() => rerun()}
      >
        <ReplayRounded />
        Rerun the test
      </Fab>
    
    </div>    
  )
}