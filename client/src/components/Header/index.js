import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import MenuRounded from "@material-ui/icons/MenuRounded";
import { connect } from "react-redux";
import { signOut } from "../../actions/authAction";
import { handleDialog, handleDrawer } from "../../actions/appStateAction";
import LinkTo from "../Button/LinkTo";

function Header(props) {
  const { handleDialog, auth, signOut, handleDrawer } = props;
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex aign-items-center justify-content-between">
            <LinkTo className="h3" text="MCQ Question" to="/" />
            <div className="header-nav d-flex align-items-center justify-content-end">
              <div className="btns">
                { auth.isAuthenticated ?
                  <React.Fragment>
                    <LinkTo text="Dashboard" to="/dashboard" />
                    <Button color="secondary"onClick={() => signOut()}>sign out</Button>
                  </React.Fragment>
                : 
                  <React.Fragment>
                    <Button color="secondary" onClick={() => handleDialog("signinDialogOpen", true)}>
                      Signin
                    </Button>
                    <Button color="secondary" onClick={() => handleDialog("signupDialogOpen", true)}>
                      Signup
                    </Button>
                  </React.Fragment>
                }
              </div>
            </div>
            <div className="hamburger">
              <IconButton aria-label="menu" onClick={() => handleDrawer(true)}>
                <MenuRounded />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

    </header>
  )
}

const mapStateToProps = state => ({
  auth: state.authReducer
})

export default connect(mapStateToProps, { handleDialog, signOut, handleDrawer })(Header)