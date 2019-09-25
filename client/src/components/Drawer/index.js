import React from "react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import { signOut } from "../../actions/authAction";
import { handleDrawer, handleDialog } from "../../actions/appStateAction";
import A from "../Button/A";
import LinkTo from "../Button/LinkTo";
import GoogleLogin from "../Button/Google";

function MuiDrawer(props) {
  const { handleDrawer, appState, signOut, auth, handleDialog } = props;
  const { drawerOpen } = appState;
  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => handleDrawer(false)}>
      <div
        className="drawer"
        role="presentation"
        onClick={() => handleDrawer(false)}
        onKeyDown={() => handleDrawer(false)}
      >
        { auth.isAuthenticated ?
          <React.Fragment>
            <LinkTo 
              text="Dashboard" 
              to="/dashboard" 
              color="primary"
              fullWidth
              variant="outlined"
              />
            <Button 
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => signOut()}
            >
              sign out
            </Button>
          </React.Fragment>
        : 
          <React.Fragment>
            <Button 
              variant="outlined"
              color="primary" 
              size="large"
              fullWidth
              onClick={() => handleDialog("signinDialogOpen", true)}>
              Signin
            </Button>
            <Button 
              variant="outlined"
              color="primary" 
              size="large"
              fullWidth
              onClick={() => handleDialog("signupDialogOpen", true)}>
              Signup
            </Button>
            <GoogleLogin text="Continue with Google" />
          </React.Fragment>
        }
        <div className="dev-info">
          Developed by <A to="https://github.com/sanoofp" text="@sanoofp" />
        </div>
      </div>
    </Drawer>
  )
}

const mapStateToProps = state => ({
  appState: state.appStateReducer,
  auth: state.authReducer
})

export default connect(mapStateToProps, { handleDrawer, signOut, handleDialog })(MuiDrawer)