import { createStore } from "redux"
import reducer from "../reducers"

const initialState = {todos: []}
export const store = createStore(reducer, initialState)