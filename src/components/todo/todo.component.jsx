import React, { useState } from "react";
import "./todo.styles.css";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloseIcon from "@material-ui/icons/Close";
import db from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo({ todo }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(todo.todo);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = (event) => {
    event.preventDefault(); // stop refresh after submit
    db.collection("todos").doc(todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <ListItem>
        <ListItemText primary="Todo" secondary={todo.todo} />
        <Button color="primary" variant="contained" onClick={handleOpen}>
          <CreateIcon />
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={(event) => db.collection("todos").doc(todo.id).delete()}
        >
          <DeleteForeverIcon /> Delete
        </Button>
      </ListItem>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <h2>Edit Todo</h2>
          <form action="" method="post">
            <FormControl>
              <InputLabel>Edit Todo</InputLabel>
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </FormControl>
            <Button
              disabled={!input}
              onClick={updateTodo}
              type="submit"
              variant="contained"
              color="primary"
            >
              Update Todo
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              <CloseIcon />
              Close
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Todo;
