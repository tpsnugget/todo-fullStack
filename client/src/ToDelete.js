import React from 'react'
import PropTypes from "prop-types"
import "./Count.css"

const ToDelete = (props) => {

   ToDelete.propTypes = {
      /* Passed down from TodoList Component */
      /* The entire list of todos */
      todos: PropTypes.array
   }

   var total = props.todos.length
   var count = 0

   props.todos.map( todo => todo.completed ? 0: count++ )

   return (
      <div>
         <div>
            Completed to Delete:
         </div>
         <div className="Count-count">
            {total - count}
         </div>
      </div>
   )
}

export default ToDelete