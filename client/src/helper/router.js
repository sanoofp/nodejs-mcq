import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import Report from "../pages/report";

function PrivateRoute({ component: Component, auth: isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={renderProps =>
        isAuthenticated ? (
          <Component {...renderProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: renderProps.location }
            }}
          />
        )
      }
    />
  );
}

function Routes(props) {
  const { auth } = props;
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute auth={auth.isAuthenticated} exact path="/dashboard" component={Dashboard} />
      <PrivateRoute auth={auth.isAuthenticated} exact path="/dashboard/report" component={Report} />
    </Switch>
  )
}

const mapStateToProps = state => ({
  auth: state.authReducer
})

export default connect(mapStateToProps)(Routes);