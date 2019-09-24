import React from "react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import { signOut } from "../../actions/authAction";
import { handleDrawer } from "../../actions/appStateAction";
import LinkTo from "../Button/LinkTo";

function MuiDrawer(props) {
  const { handleDrawer, appState, signOut } = props;
  const { drawerOpen } = appState;
  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => handleDrawer(false)}>
      <div
        role="presentation"
        onClick={() => handleDrawer(false)}
        onKeyDown={() => handleDrawer(false)}
      >
      </div>
    </Drawer>
  )
}

const mapStateToProps = state => ({
  appState: state.appStateReducer
})

export default connect(mapStateToProps, { handleDrawer, signOut })(MuiDrawer)