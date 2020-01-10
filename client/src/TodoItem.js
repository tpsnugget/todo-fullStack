import React, { Component } from 'react'
import PropTypes from "prop-types"
import "./TodoItem.css"

class TodoItem extends Component {

   static propTypes = {
      /* Passed down from TodoList Component */
      /* Each full todo minus the id */
      todo: PropTypes.object,

      /* The delete function */
      deleteTodo: PropTypes.func
   }

   handleClick = (e) => {
      this.props.onDelete(e.target.id)
   }

   toggleClick = () => {
      // console.log("this.props.todo in toggleClick ", this.props.todo)
      this.props.onToggle(this.props.todo)
   }

   render() {

      const { completed, id, name } = this.props

      return (
         <div className="TodoItem-container">
            <div className="TodoItem-div-li" onClick={this.toggleClick}>
               <li
                  className="TodoItem-li"
                  id={id}
                  style={{ textDecoration: completed ? "line-through" : "none" }}
               >
                  {name}
               </li>
            </div>
            <div className="TodoItem-div-span">
               <span
                  className="TodoItem-span"
                  id={id}
                  onClick={this.handleClick}
               >X</span>
            </div>
         </div>
      )
   }
}

export default TodoItem