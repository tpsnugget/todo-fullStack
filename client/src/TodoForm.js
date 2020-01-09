import React, { Component } from 'react'
import PropTypes from "prop-types"

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
         <div>
            <form>
               <label>Todo:
                  <input
                     type="text"
                     value={inputValue}
                     onChange={this.handleChange}
                  />
               </label>
               <button
                  onClick={this.handleSubmit}
               >Add Todo</button>
            </form>
         </div>
      )
   }
}

export default TodoForm