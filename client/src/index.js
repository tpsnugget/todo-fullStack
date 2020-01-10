import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { store } from "./store"
import './index.css';
import App from './App';

const render = () =>

ReactDOM.render(
      <Router>
         <App />
      </Router>
   , document.getElementById('root'));

render()

store.subscribe(render)