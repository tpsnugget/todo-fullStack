export default (state, action) => {

   switch(action.type){
      case "LOAD_DATA_FROM_DB":
      return {
         ...state,
         todos: action.todos
      }
      default:
      return state
   }
}