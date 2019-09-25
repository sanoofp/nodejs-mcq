import React from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { googleAuth } from "../../actions/authAction";

function GoogleButton(props) {
  const { text, googleAuth } = props;
  const response = res => {
    googleAuth(res)
  }
  
  return (
    <GoogleLogin
      clientId="1041797103341-42uikfarcsi0qra6mvlsejap04cdhrpq.apps.googleusercontent.com"
      buttonText={text}
      onSuccess={response}
      onFailure={response}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default connect(null, { googleAuth })(GoogleButton)