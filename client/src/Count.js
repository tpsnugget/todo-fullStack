import React from 'react'
import PropTypes from "prop-types"
import "./Count.css"

const Count = (props) => {

   Count.propTypes = {
      /* Passed down from TodoList Component */
      /* The entire list of todos */
      todos: PropTypes.array
   }

   var count = 0

   props.todos.map( todo => todo.completed ? 0: count++ )

   return (
      <div>
         <div>
            Remaining Items To Do:
         </div>
         <div className="Count-count">
            {count}
         </div>
      </div>
   )
}

export default Count