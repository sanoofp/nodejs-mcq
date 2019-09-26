import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";
import { handleDialog } from "../../actions/appStateAction";
import { startTimer } from "../../actions/timerAction";

function Instructions(props) {
  const { appState: { instructionsDialogOpen }, handleDialog, startTimer } = props;
  return (
    <Dialog
      open={instructionsDialogOpen}
      onClose={() => handleDialog("instructionsDialogOpen", false)}
      maxWidth="md"
      fullWidth={true}
      className="dialog"
    >
    <DialogContent className="dialog">
      <h1>Instructions</h1>
    
      <ul>
        <li>Current active question can be shown on the left side of the dashboard.</li>
        <li>After selecting your option, you need to click on <b>Save</b>, else the question will not be considred for submission</li>
        <li>You can select questions from the <b>Questions</b> tab at the right side of the dashboard.</li>
        <li>Question attended will be shown in green colour</li>
        <li>You can revire each submitted questions by clicking on the question number.</li>

        <li><b>Test will ends in 15 mins, you need to submit on or before this time</b></li>
      </ul>
      <h4>Click on the below button to Start the Test</h4>

      <Button 
        fullWidth 
        color="primary" 
        onClick={() => {
          handleDialog("instructionsDialogOpen", false)
          startTimer()
        }} 
        variant="outlined"
      >
        I understand, Start the test
      </Button>
    </DialogContent>
  </Dialog>
  )
}

const mapStateToProps = state => ({
  appState: state.appStateReducer
})

export default connect(mapStateToProps, { handleDialog, startTimer })(Instructions);