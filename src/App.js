import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  FormControl,
  List,
  Container,
  Input,
  InputLabel,
} from "@material-ui/core";
import Todo from "./components/todo/todo.component";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  // fetch data from database as the app loads
  useEffect(() => {
    // this code runs when the app loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // get data from db and adding to setTodos
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);
  const addTodo = (event) => {
    event.preventDefault(); // stop refresh after submit
    // setTodos([...todos, input]); // locally add todos
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); // clear the input after clicking the button
  };
  return (
    <Container className="App" maxWidth="sm">
      <form className="input" action="" method="post">
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          onClick={addTodo}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>
      <List>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </List>
    </Container>
  );
}

export default App;
