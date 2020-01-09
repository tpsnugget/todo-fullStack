import React, { Component } from 'react'
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
const APIURL = "/api/todos"

class TodoList extends Component {

   constructor(props) {
      super(props)
      this.state = {
         todos: []
      }
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

   render() {

      const { todos } = this.state

      return (
         <div>
            <h1>Todo List is up Man!</h1>
            <TodoForm addTodo={this.addTodo}/>
            <ul>
               {todos.map(todo => <TodoItem key={todo._id} {...todo} />)}
            </ul>
         </div>
      )
   }
}

export default TodoList