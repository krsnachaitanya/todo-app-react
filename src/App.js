import React, { useState } from "react";
import {
  Button,
  FormControl,
  List,
  ListItem,
  Container,
  Input,
  InputLabel,
} from "@material-ui/core";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    "Take dogs for a walk",
    "Take the rubbish out",
  ]);
  const [input, setInput] = useState("");
  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, input]);
    setInput("");
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
          <ListItem>{todo}</ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
