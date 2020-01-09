import React, { Component } from 'react'
import PropTypes from "prop-types"
import "./TodoForm.css"

class TodoForm extends Component {

   static propTypes = {
      /*  */
      addTodo: PropTypes.func
   }

   constructor(props) {
      super(props)
      this.state = {
         inputValue: ""
      }
   }

   handleChange = (e) => {
      this.setState({
         inputValue: e.target.value
      })
   }

   handleSubmit = (e) => {
      e.preventDefault()
      this.props.addTodo(this.state.inputValue)
      this.setState({
         inputValue: ""
      })
   }

   render() {

      const { inputValue } = this.state

      return (
         <div className="TodoForm-container">
            <form className="TodoForm-form">
               <label className="TodoForm-pieces">Todo:
                  <input
                     className="TodoForm-pieces TodoForm-input"
                     type="text"
                     value={inputValue}
                     onChange={this.handleChange}
                  />
               </label>
               <button
                  className="TodoForm-pieces TodoForm-button"
                  onClick={this.handleSubmit}
               >Add Todo</button>
            </form>
         </div>
      )
   }
}

export default TodoForm