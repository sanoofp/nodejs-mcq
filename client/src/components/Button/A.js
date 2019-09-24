import React from "react";

export default function A(props) {
  return <a target="_blank" rel="noopener noreferrer" href={props.to}>{props.text}</a> 
}