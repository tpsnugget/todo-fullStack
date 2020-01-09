import React from 'react'
import PropTypes from "prop-types"

export default function TodoItem({ completed, name }) {

   TodoItem.propTypes = {
      /* Passed down from TodoList Component */
      todo: PropTypes.object
   }

   return (
      <div>
         <li style={{textDecoration: completed ? "line-through" : "none"}}>{name}</li>
      </div>
   )
}
