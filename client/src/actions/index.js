export function loadTodosFromDB(todos){
   return {
      type: "LOAD_DATA_FROM_DB",
      todos: todos
   }
}

