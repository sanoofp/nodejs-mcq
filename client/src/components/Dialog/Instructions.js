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
      aria-labelledby="instruction"
      aria-describedby="Instruction"
    >
    <DialogContent className="dialog">
      <h1>Instructions</h1>
      
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