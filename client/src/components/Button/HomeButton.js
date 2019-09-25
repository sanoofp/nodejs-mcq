import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function HomeButton(props) {
  if(props.to) {
    return(
      <Button
        variant="contained"
        size="large"
        component={Link}
        to={props.to}
        fullWidth
        color={props.color}
      >
        {props.text}
        {props.icon}
      </Button>
    )
  }

  return <Button
    variant="contained"
    size="large"
    onClick={() => props.onClick()}
    fullWidth
    color={props.color}
    {...props}
  >
    {props.text}
    {props.icon}
  </Button>
}