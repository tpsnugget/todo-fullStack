import React from 'react';
import { Route, Switch } from "react-router-dom"
import TodoList from "./TodoList"
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={TodoList} />
      </Switch>
    </div>
  );
}

export default App;
