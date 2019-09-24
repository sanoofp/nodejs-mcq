import React from "react";
import { connect } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import CloseRounded from '@material-ui/icons/CloseRounded';
import Snackbar from '@material-ui/core/Snackbar';
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { handleSnackbar } from "../../actions/appStateAction";

function InfoNotify(props) {
  const { snackbar } = props.appState;
  const { handleSnackbar } = props;
  const bgcolor = snackbar.type === "error" ? red["400"] : green["400"];

  return (
    <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    open={snackbar.open}
    autoHideDuration={6000}
    onClose={() => handleSnackbar(false, snackbar.type, snackbar.message)}
    >
    <SnackbarContent
      style={{ backgroundColor: bgcolor }}
      message={<span id="message">{snackbar.message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={() => handleSnackbar(false, snackbar.type, snackbar.message)}
        >
          <CloseRounded />
        </IconButton>,
      ]}

    />
  </Snackbar>
  ) 
}

const mapStateToProps = state => ({
  appState: state.appStateReducer
});

export default connect(mapStateToProps, { handleSnackbar })(InfoNotify);
