const APIURL = "/api/todos/"


export async function getTodos() {
   return fetch(APIURL)
      .then(resp => {
         if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
               return resp.json().then(data => {
                  let err = { errorMessage: data.message }
                  throw err
               })
            } else {
               let err = { errorMessage: "Please try again later, the server is not responding" }
               throw err
            }
         }
         return resp.json()
      })
}

export async function createTodo(todo) {
   return fetch(APIURL, {
      method: "post",
      headers: new Headers({
         "Content-type": "application/json"
      }),
      body: JSON.stringify({ name: todo })
   })
      .then(resp => {
         if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
               return resp.json().then(data => {
                  let err = { errorMessage: data.message }
                  throw err
               })
            } else {
               let err = { errorMessage: "Please try again later, the server is not responding" }
               throw err
            }
         }
         return resp.json()
      })
}

export async function removeTodo(id){
   const deleteURL = APIURL + id
   return fetch(deleteURL, {
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
}

export async function updateTodo(todo){
   const toggleURL = APIURL + todo._id
   return fetch(toggleURL, {
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
}