import React, { Component } from 'react'
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import "./TodoList.css"

const APIURL = "/api/todos/"


class TodoList extends Component {

   constructor(props) {
      super(props)
      this.state = {
         todos: []
      }
      this.deleteTodo = this.deleteTodo.bind(this)
      this.toggleTodo = this.toggleTodo.bind(this)
   }

   componentDidMount(){
      fetch(APIURL)
         .then(resp => {
            if(!resp.ok){
               if(resp.status >= 400 && resp.status < 500){
                  return resp.json().then(data => {
                     let err = {errorMessage: data.message}
                     throw err
                  })
               } else {
                  let err = {errorMessage: "Please try again later, the server is not responding"}
                  throw err
               }
            }
            return resp.json()
         })
         .then(todos => this.setState({todos}))
   }

   addTodo = (todo) => {
      fetch(APIURL, {
         method: "post",
         headers: new Headers({
            "Content-type": "application/json"
         }),
         body: JSON.stringify({name: todo})
      })
      .then(resp => {
         if(!resp.ok){
            if(resp.status >= 400 && resp.status < 500){
               return resp.json().then(data => {
                  let err = {errorMessage: data.message}
                  throw err
               })
            } else {
               let err = {errorMessage: "Please try again later, the server is not responding"}
               throw err
            }
         }
         return resp.json()
      })
      .then(newTodo => this.setState({todos: [...this.state.todos, newTodo]}))
   }

   deleteTodo(id){
      const deleteURL = APIURL + id
      fetch(deleteURL, {
         method: "delete"
      })
      .then(resp => {
         if(!resp.ok){
            if(resp.status >= 400 && resp.status < 500){
               return resp.json().then(data => {
                  let err = {errorMessage: data.message}
                  throw err
               })
            } else {
               let err = {errorMessage: "Please try again later, the server is not responding"}
               throw err
            }
         }
      })
      .then(() => {
         const todos = this.state.todos.filter(todo => todo._id !== id)
         this.setState({todos: todos})
      })
   }

   toggleTodo = (todo) => {
      // console.log("toggle id ", todo._id)
      // console.log("toggle completed ", todo.completed)
      const toggleURL = APIURL + todo._id
      fetch(toggleURL, {
         method: "put",
         headers: new Headers({
            "Content-type": "application/json"
         }),
         body: JSON.stringify({completed: !todo.completed})
      })
      .then(resp => {
         if(!resp.ok){
            if(resp.status >= 400 && resp.status < 500){
               return resp.json().then(data => {
                  let err = {errorMessage: data.message}
                  throw err
               })
            } else {
               let err = {errorMessage: "Please try again later, the server is not responding"}
               throw err
            }
         }
         return resp.json()
      })
      .then(updatedTodo => {
         const todos = this.state.todos.map(t => 
            (t._id === updatedTodo._id)
            ? {...t, completed: !t.completed}
            : t
         )
         this.setState({todos: todos})
      })
   }

   render() {

      var { todos } = this.state

      todos.sort( (a, b) => {
         if(a.name < b.name){
            return -1
         }
      } )

      return (
         <div className="TodoList-container">
            <h1>Todo List</h1>
            <TodoForm addTodo={this.addTodo}/>
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
      )
   }
}

export default TodoList