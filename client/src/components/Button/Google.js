import React from "react";
import GoogleLogin from "react-google-login";

export default function GoogleButton(props) {
  return (
    <GoogleLogin
      clientId="1041797103341-42uikfarcsi0qra6mvlsejap04cdhrpq.apps.googleusercontent.com"
      buttonText={props.text}
      onSuccess={res => props.response(res)}
      onFailure={err => props.response(err)}
      cookiePolicy={'single_host_origin'}
    />
  );
}
