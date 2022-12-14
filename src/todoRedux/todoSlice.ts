import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { generateId } from '../utils/utils'

type Todo = {
  id: string
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
        id: generateId().toString(),
        text: action.payload,
        completed: false,
      }
      state.unshift(newToDo)
      saveStateLocalStorage(keyLS, state)
    },
    toggleCompleted(state, action: PayloadAction<string>) {
      state.map(item =>
        item.id === action.payload ? (item.completed = !item.completed) : item.completed
      )
      saveStateLocalStorage(keyLS, state)
    },
    toggleCompleteAll(state) {
      state.map(item => (item.completed = true))
      saveStateLocalStorage(keyLS, state)
    },
    deleteToDo(state, action: PayloadAction<string>) {
      state = state.filter(item => item.id !== action.payload)
      saveStateLocalStorage(keyLS, state)
      return state
    },
    deleteCompletedToDos(state) {
      state = state.filter(item => item.completed !== true)
      saveStateLocalStorage(keyLS, state)
      return state
    },
    sortToDos(state, action: PayloadAction<{ dragItem: number; dragItemOver: number }>) {
      const draggedItem = state.splice(action.payload.dragItem, 1)[0]
      state.splice(action.payload.dragItemOver, 0, draggedItem)
      saveStateLocalStorage(keyLS, state)
    },
  },
})

export const todoSliceActions = todoSlice.actions
export const todoReducer = todoSlice.reducer
