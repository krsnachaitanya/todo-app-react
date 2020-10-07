import React from "react";
import "./todo.styles.css";
import { ListItem } from "@material-ui/core";

function Todo({ text }) {
  return <ListItem>{text}</ListItem>;
}

export default Todo;
