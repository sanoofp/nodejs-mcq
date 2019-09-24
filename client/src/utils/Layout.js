import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import InfoNotify from "../components/Snackbar";
import MuiDrawer from "../components/Drawer";
import Loading from "../components/Loading";
import { loadUser } from "../actions/authAction";

function Layout(props) {
  const { loadUser } = props;
  useEffect(() => { loadUser() }, [loadUser]);

  return (
    <React.Fragment>
      <Header />
      {props.children}
      <Loading />
      <MuiDrawer />
      <InfoNotify />
    </React.Fragment>
  )
}

export default connect(null, { loadUser })(Layout)