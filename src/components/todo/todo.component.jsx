import React from "react";
import "./todo.styles.css";
import { Button, ListItem, ListItemText } from "@material-ui/core";
import db from "../../firebase";

function Todo({ todo }) {
  return (
    <ListItem>
      <ListItemText primary="Todo" secondary={todo.todo} />
      <Button onClick={(event) => db.collection("todos").doc(todo.id).delete()}>
        Delete
      </Button>
    </ListItem>
  );
}

export default Todo;
