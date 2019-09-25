import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function LinkTo(props) {
  return(
    <Button
      {...props}
      component={Link}
      to={props.to}
      color={`${props.color ? props.color : "secondary"}`}
    >
      {props.text}
    </Button>
  )
}