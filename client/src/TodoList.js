import React, { Component } from 'react'
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import Count from "./Count"
import ToDelete from "./ToDelete"
import { store } from "./store"
import { loadTodosFromDB } from "./actions"
import * as apiCalls from "./api"

import "./TodoList.css"

class TodoList extends Component {

   constructor(props) {
      super(props)
      this.addTodo = this.addTodo.bind(this)
      this.deleteTodo = this.deleteTodo.bind(this)
      this.toggleTodo = this.toggleTodo.bind(this)
   }

   componentDidMount() {
      this.loadTodos()
   }

   async loadTodos() {
      let todos = await apiCalls.getTodos()
      store.dispatch(loadTodosFromDB(todos))
      
   }

   async addTodo(todo) {
      let newTodo = await apiCalls.createTodo(todo)
      var { todos } = store.getState()
      newTodo = [...todos, newTodo]
      store.dispatch(loadTodosFromDB(newTodo))
   }

   async deleteTodo(id) {
      await apiCalls.removeTodo(id)
      var { todos } = store.getState()
      todos = todos.filter(todo => todo._id !== id)
      store.dispatch(loadTodosFromDB(todos))
   }

   async toggleTodo(todo) {
      let updatedTodo = await apiCalls.updateTodo(todo)
      var { todos } = store.getState()
      todos = todos.map(t =>
         (t._id === updatedTodo._id)
            ? { ...t, completed: !t.completed }
            : t
      )
      store.dispatch(loadTodosFromDB(todos))
   }

   render() {

      var { todos } = store.getState()

      todos.sort((a, b) => {
         if (a.name < b.name) {
            return -1
         } else {
            return 0
         }
      })

      return (
         <div className="TodoList-container">
            <h1>Todo List</h1>
            <TodoForm addTodo={this.addTodo} />
            <div className="TodoList-inner-container">
               <div className="TodoList-ul-div">
                  <ul className="TodoList-ul">
                     {todos.map(todo =>
                        <TodoItem
                           key={todo._id}
                           id={todo._id}
                           {...todo}
                           todo={todo}
                           onDelete={this.deleteTodo}
                           onToggle={this.toggleTodo}
                        />)}
                  </ul>
               </div>
               <div className="TodoList-count">
                  <Count todos={todos}/>
                  <ToDelete todos={todos}/>
            </div>
            </div>
         </div>
      )
   }
}

export default TodoList