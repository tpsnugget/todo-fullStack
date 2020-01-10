import React, { Component } from 'react'
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import Count from "./Count"
import ToDelete from "./ToDelete"
import "./TodoList.css"
import * as apiCalls from "./api"

class TodoList extends Component {

   constructor(props) {
      super(props)
      this.state = {
         todos: []
      }
      this.addTodo = this.addTodo.bind(this)
      this.deleteTodo = this.deleteTodo.bind(this)
      this.toggleTodo = this.toggleTodo.bind(this)
   }

   componentDidMount() {
      this.loadTodos()
   }

   async loadTodos() {
      let todos = await apiCalls.getTodos()
      this.setState({ todos })
   }

   async addTodo(todo) {
      let newTodo = await apiCalls.createTodo(todo)
      this.setState({ todos: [...this.state.todos, newTodo] })
   }

   async deleteTodo(id) {
      await apiCalls.removeTodo(id)
      const todos = this.state.todos.filter(todo => todo._id !== id)
      this.setState({ todos: todos })
   }

   async toggleTodo(todo) {
      let updatedTodo = await apiCalls.updateTodo(todo)
      const todos = this.state.todos.map(t =>
         (t._id === updatedTodo._id)
            ? { ...t, completed: !t.completed }
            : t
      )
      this.setState({ todos: todos })
   }

   render() {

      var { todos } = this.state

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
                  <Count todos={this.state.todos}/>
                  <ToDelete todos={this.state.todos}/>
            </div>
            </div>
         </div>
      )
   }
}

export default TodoList