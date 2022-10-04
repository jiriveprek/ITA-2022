import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { todoSliceActions } from './todoSlice'

import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { RootState, store } from './store'
import { themes } from '../themes'
import { useAppDispatch, useAppSelector } from './hooks'
import React, { useState } from 'react'
import styled from '@emotion/styled'

const xMark = '\u2716'
const tickMark = '\u2714'
const arrow = '\u276f'
const plus = '\u002B'

export const Todos = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
}

const getState = (state: RootState) => state.todo

const TodoList = () => {
  const todos = useAppSelector(getState)
  const dispatch = useAppDispatch()
  const [inputText, setInputText] = useState('')
  const [filteredTodos, setFilteredTodos] = useState('All' as 'All' | 'Active' | 'Completed')

  const filterHandler = () => {
    switch (filteredTodos) {
      case 'Completed':
        return todos.filter(todo => todo.completed === true)

      case 'Active':
        return todos.filter(todo => todo.completed === false)

      default:
        return todos
    }
  }

  const createToDoHandler = (text: string) => {
    if (inputText.trim() === '') {
      return
    }
    dispatch(todoSliceActions.addTodo(text))
    setInputText('')
  }

  const sortHandler = (drop: DropResult) => {
    if (!drop.destination) {
      return
    } else {
      const indexDragItem = todos.findIndex(
        todo => todo.id === filterHandler()[drop.source.index].id
      )
      const indexDragOverItem = todos.findIndex(
        todo => todo.id === filterHandler()[drop.destination!.index].id
      )
      dispatch(
        todoSliceActions.sortToDos({ dragItem: indexDragItem, dragItemOver: indexDragOverItem })
      )
    }
  }

  return (
    <HelmetProvider>
      <Div_Main>
        <Helmet>
          <title>Jiří Vepřek | Redux To-do list</title>
        </Helmet>
        <Div_TodoContainer>
          <H1_Heading>To-do list</H1_Heading>
          <Div_FiltersContainer>
            <Button_Filters_All filter={filteredTodos} onClick={() => setFilteredTodos('All')}>
              All
            </Button_Filters_All>
            <Button_Filters_Active
              filter={filteredTodos}
              onClick={() => setFilteredTodos('Active')}
            >
              Active
            </Button_Filters_Active>
            <Button_Filters_Completed
              filter={filteredTodos}
              onClick={() => setFilteredTodos('Completed')}
            >
              Completed
            </Button_Filters_Completed>
          </Div_FiltersContainer>
          <form onSubmit={e => e.preventDefault()}>
            <Div_HeaderContainer>
              <Input
                type='text'
                value={inputText}
                placeholder='What needs to be done?'
                onChange={e => setInputText(e.target.value)}
              />
              <Button_Submit
                type='submit'
                onClick={() => {
                  createToDoHandler(inputText)
                }}
              >
                {plus}
              </Button_Submit>
              <Button_CompleteAll onClick={() => dispatch(todoSliceActions.toggleCompleteAll())}>
                {arrow}
              </Button_CompleteAll>
            </Div_HeaderContainer>
            <DragDropContext onDragEnd={e => sortHandler(e)}>
              <Droppable droppableId='1'>
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {filterHandler().map((item, index) => {
                      return (
                        <Draggable key={item.id} index={index} draggableId={item.id}>
                          {provided => (
                            <Div_ListItemContainer
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Button_Complete
                                completed={item.completed}
                                onClick={() => dispatch(todoSliceActions.toggleCompleted(item.id))}
                              >
                                {tickMark}
                              </Button_Complete>
                              <Label
                                onClick={() => dispatch(todoSliceActions.toggleCompleted(item.id))}
                                completed={item.completed}
                              >
                                {item.text}
                              </Label>
                              <Button_Delete
                                onClick={() => dispatch(todoSliceActions.deleteToDo(item.id))}
                              >
                                {xMark}
                              </Button_Delete>
                            </Div_ListItemContainer>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </form>
          <Div_TodoFooter>
            <P_CountItems>{todos.filter(todo => !todo.completed).length} items left</P_CountItems>
            <Button_DeleteCompleted
              onClick={() => dispatch(todoSliceActions.deleteCompletedToDos())}
            >
              Delete completed
            </Button_DeleteCompleted>
          </Div_TodoFooter>
        </Div_TodoContainer>
      </Div_Main>
    </HelmetProvider>
  )
}

const Div_Main = styled.div`
  min-width: 360px;
`

const Div_TodoContainer = styled.div`
  margin: ${themes.spacing.none} auto;
  padding: ${themes.spacing.xs} ${themes.spacing.none};

  width: 100%;
  min-width: 360px;
  max-width: 560px;

  border-radius: 10px;
`

const Div_HeaderContainer = styled.div`
  position: relative;
`

const Div_ListItemContainer = styled.div`
  position: relative;

  margin-bottom: -0.1em;
  padding: ${themes.spacing.xs};

  border-left: 1px solid ${themes.color.dark};
  border-right: 1px solid ${themes.color.dark};
  border-bottom: 1px solid ${themes.color.dark};
  border: 1px solid ${themes.color.dark};

  background-color: ${themes.color.bright};
`

const Div_FiltersContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
`

const Div_TodoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${themes.spacing.xs};
`

const H1_Heading = styled.h1`
  margin: ${themes.spacing.xs} auto;

  border-top: 3px solid ${themes.color.dark};
  border-bottom: 3px solid ${themes.color.dark};

  width: max-content;

  text-align: center;

  color: ${themes.color.dark};
  font-weight: 800;
`

const Input = styled.input`
  &:focus {
    outline: none;
  }
  margin-bottom: -0.1em;
  padding: ${themes.spacing.s};
  padding-left: ${themes.spacing.l};
  padding-right: ${themes.spacing.l};

  width: 100%;
  box-sizing: border-box;

  font-size: 0.8rem;

  border: 3px solid ${themes.color.dark};
`

type IsCompleted = {
  completed: boolean
}

const Label = styled.label<IsCompleted>`
  display: block;

  cursor: pointer;

  padding-left: ${themes.spacing.m};
  padding-right: ${themes.spacing.m};

  word-break: break-all;

  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  color: ${props => (props.completed ? `${themes.color.darkgrey}` : `${themes.color.dark}`)};
  background-color: ${themes.color.bright};
`

const P_CountItems = styled.p`
  margin: ${themes.spacing.none} ${themes.spacing.xs};
  padding-top: 0.3em;
  padding-bottom: 0.3em;

  border-bottom: 2px solid ${themes.color.dark};
  border-top: 2px solid ${themes.color.dark};

  font-weight: 700;

  color: ${themes.color.dark};

  @media (max-width: ${themes.mediaQuery.tablet}) {
    display: none;
  }
`

const Button_Submit = styled.button`
  position: absolute;
  right: 1.2%;
  top: 12%;
  z-index: 1;

  color: ${themes.color.dark};

  cursor: pointer;

  border: none;

  font-size: ${themes.fonts.xl};

  background-color: transparent;
`
const Button_CompleteAll = styled.button`
  position: absolute;
  left: 2.5%;
  top: 20%;
  z-index: 1;

  transform: rotate(90deg);

  border: none;

  font-size: 1.2rem;

  background-color: transparent;
`

const Button_Complete = styled.button<IsCompleted>`
  position: absolute;
  top: 8px;

  font-size: 1em;
  border: none;

  background-color: transparent;
  color: ${props => (props.completed ? `${themes.color.green}` : `${themes.color.darkgrey}`)};

  &:hover {
    color: ${themes.color.dark};
  }
`

const Button_Delete = styled.button`
  position: absolute;
  right: 0;
  top: 7px;

  margin-right: 0.5em;

  font-size: 1em;
  font-weight: 700;
  border: none;

  background-color: transparent;
  color: ${themes.color.darkgrey};

  &:hover {
    color: ${themes.color.dark};
  }
`

const Button_DeleteCompleted = styled.button`
  margin: ${themes.spacing.xs};
  padding: 1em ${themes.spacing.xs};

  transition: color 0.5s, background-color 0.5s;

  border: 1px solid transparent;

  width: 9.5em;

  font-weight: 700;

  color: ${themes.color.bright};
  background-color: ${themes.color.dark};

  &:active,
  :hover {
    transition: ease-out;
    color: ${themes.color.dark};
    border: 1px solid ${themes.color.dark};
    background-color: ${themes.color.bright};
  }
  @media (max-width: ${themes.mediaQuery.tablet}) {
    width: 100%;
  }
`

type FilterValue = {
  filter: 'All' | 'Active' | 'Completed'
}

const Button_Filters_All = styled.button<FilterValue>`
  margin: ${themes.spacing.xs};
  padding: ${themes.spacing.xs};

  transition: color 0.5s, background-color 0.5s;

  border: 1px solid ${themes.color.dark};
  border-radius: 5%;

  width: 7em;

  font-weight: 700;

  background-color: ${props =>
    props.filter === 'All' ? `${themes.color.bright}` : `${themes.color.dark}`};
  color: ${props => (props.filter === 'All' ? `${themes.color.dark}` : `${themes.color.bright}`)};
  &:focus,
  :hover {
    transition: ease-out;
    color: ${themes.color.dark};
    border: 1px solid ${themes.color.dark};
    background-color: ${themes.color.bright};
  }
`

const Button_Filters_Active = styled.button<FilterValue>`
  margin: ${themes.spacing.xs};
  padding: ${themes.spacing.xs};

  transition: color 0.5s, background-color 0.5s;

  border: 1px solid ${themes.color.dark};
  border-radius: 5%;

  width: 7em;

  font-weight: 700;

  background-color: ${props =>
    props.filter === 'Active' ? `${themes.color.bright}` : `${themes.color.dark}`};
  color: ${props =>
    props.filter === 'Active' ? `${themes.color.dark}` : `${themes.color.bright}`};
  &:focus,
  :hover {
    transition: ease-out;
    color: ${themes.color.dark};
    border: 1px solid ${themes.color.dark};
    background-color: ${themes.color.bright};
  }
`

const Button_Filters_Completed = styled.button<FilterValue>`
  margin: ${themes.spacing.xs};
  padding: ${themes.spacing.xs};

  transition: color 0.5s, background-color 0.5s;

  border: 1px solid ${themes.color.dark};
  border-radius: 5%;

  width: 7em;

  font-weight: 700;

  background-color: ${props =>
    props.filter === 'Completed' ? `${themes.color.bright}` : `${themes.color.dark}`};
  color: ${props =>
    props.filter === 'Completed' ? `${themes.color.dark}` : `${themes.color.bright}`};
  &:focus,
  :hover {
    transition: ease-out;
    color: ${themes.color.dark};
    border: 1px solid ${themes.color.dark};
    background-color: ${themes.color.bright};
  }
`
