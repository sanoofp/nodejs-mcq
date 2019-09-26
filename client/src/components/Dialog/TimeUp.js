import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";
import { submitAnswers } from "../../actions/questionAction";
import { handleDialog } from "../../actions/appStateAction";

function TimeUp(props) {
  const { appState: { timeupDialogOpen }, handleDialog, submitAnswers } = props;
  return (
    <Dialog
      open={timeupDialogOpen}
      onClose={() => handleDialog("timeupDialogOpen", true)}
      className="dialog"
    >
    <DialogContent className="dialog">
      <h1>Timeup</h1>
      <p>Your time is over, Please submit your answers.</p>
      <Button 
        fullWidth 
        color="primary" 
        onClick={() => {
          handleDialog("timeupDialogOpen", false)
          submitAnswers()
        }} 
        variant="outlined"
      >
        Submit
      </Button>
    </DialogContent>
  </Dialog>
  )
}

const mapStateToProps = state => ({
  appState: state.appStateReducer
})

export default connect(mapStateToProps, { 
  handleDialog, 
  submitAnswers 
})(TimeUp);