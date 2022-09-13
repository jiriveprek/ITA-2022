import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { generateId } from '../utils/utils'

type Todo = {
  id: number
  text: string
  completed: boolean
}

const loadStateLocalStorage = (key: string): [] | Todo[] => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : []
  } catch (error) {
    console.error
    return []
  }
}

const saveStateLocalStorage = (key: string, valueToStore: Todo[]) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(valueToStore))
  } catch (error) {
    console.error
  }
}

const keyLS = 'todos'

const todoSlice = createSlice({
  name: 'todo',
  initialState: loadStateLocalStorage(keyLS) as Todo[],
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const newToDo = {
        id: generateId(),
        text: action.payload,
        completed: false,
      }
      state.unshift(newToDo)
      saveStateLocalStorage(keyLS, state)
    },
    toggleCompleted(state, action: PayloadAction<number>) {
      state.map(item =>
        item.id === action.payload ? (item.completed = !item.completed) : item.completed
      )
      saveStateLocalStorage(keyLS, state)
    },
    toggleCompleteAll(state) {
      state.map(item => (item.completed = true))
      saveStateLocalStorage(keyLS, state)
    },
    deleteToDo(state, action: PayloadAction<number>) {
      state = state.filter(item => item.id !== action.payload)
      saveStateLocalStorage(keyLS, state)
      return state
    },
    deleteCompletedToDos(state) {
      state = state.filter(item => item.completed !== true)
      saveStateLocalStorage(keyLS, state)
      return state
    },
  },
})

export const todoSliceActions = todoSlice.actions
export const todoReducer = todoSlice.reducer
