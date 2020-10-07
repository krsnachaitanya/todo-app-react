import React from "react";
import "./todo.styles.css";
import { ListItem, ListItemText } from "@material-ui/core";

function Todo({ text }) {
  return (
    <ListItem>
      <ListItemText primary="Todo" secondary={text} />
    </ListItem>
  );
}

export default Todo;
