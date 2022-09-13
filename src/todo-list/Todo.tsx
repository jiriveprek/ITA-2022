import { Helmet, HelmetProvider } from 'react-helmet-async'
import { generateId } from '../utils/utils'
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder'
import { themes } from '../themes'
import { useLocalStorage } from '../utils/hooks'
import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'

type Todo = {
  id: number
  text: string
  completed: boolean
}

const xMark = '\u2716'
const tickMark = '\u2714'
const arrow = '\u276f'

const useLogicState = () => {
  const [todos, setTodos] = useLocalStorage('todos', [] as Todo[])
  const [inputText, setInputText] = useState('')
  const [filteredTodos, setFilteredTodos] = useLocalStorage<'All' | 'Active' | 'Completed'>(
    'filteredTodos',
    'All'
  )

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

  const createToDoHandler = () => {
    if (inputText.trim() === '') {
      return
    }
    setTodos([
      {
        id: generateId(),
        text: inputText,
        completed: false,
      },
      ...todos,
    ])
    setInputText('')
  }

  const deleteCompletedHandler = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }
  return {
    todos,
    setTodos,
    inputText,
    setInputText,
    filteredTodos,
    setFilteredTodos,
    filterHandler,
    createToDoHandler,
    deleteCompletedHandler,
  }
}

export const { ContextProvider: LogicStateContextProvider, Context: LogicStateContext } =
  genericHookContextBuilder(useLogicState)

export const Todos = () => {
  return (
    <LogicStateContextProvider>
      <TodoList />
    </LogicStateContextProvider>
  )
}

const TodoList = () => {
  const logic = useContext(LogicStateContext)
  return (
    <HelmetProvider>
      <Div_Main>
        <Helmet>
          <title>Jiří Vepřek | To-do list</title>
        </Helmet>
        <Div_TodoContainer>
          <H1_Heading>To-do list</H1_Heading>
          <Div_FiltersContainer>
            <Button_Filters onClick={() => logic.setFilteredTodos('All')}>All</Button_Filters>
            <Button_Filters onClick={() => logic.setFilteredTodos('Active')}>Active</Button_Filters>
            <Button_Filters onClick={() => logic.setFilteredTodos('Completed')}>
              Completed
            </Button_Filters>
          </Div_FiltersContainer>
          <form onSubmit={e => e.preventDefault()}>
            <Div_HeaderContainer>
              <Input
                type='text'
                value={logic.inputText}
                placeholder='What needs to be done?'
                onChange={e => logic.setInputText(e.target.value)}
              />
              <Button_Submit type='submit' onClick={logic.createToDoHandler}>
                Add todo
              </Button_Submit>
              <Button_CompleteAll
                onClick={() =>
                  logic.setTodos(todo => todo.map(todos => ({ ...todos, completed: true })))
                }
              >
                {arrow}
              </Button_CompleteAll>
            </Div_HeaderContainer>
            <div>
              {logic.filterHandler().map(todo => (
                <Div_ListItemContainer key={todo.id}>
                  <Button_Complete
                    completed={todo.completed}
                    onClick={() => {
                      logic.setTodos(
                        logic.todos.map(item =>
                          item.id === todo.id
                            ? {
                                ...item,
                                completed: !item.completed,
                              }
                            : item
                        )
                      )
                    }}
                  >
                    {tickMark}
                  </Button_Complete>
                  <Label completed={todo.completed}>{todo.text}</Label>
                  <Button_Delete
                    onClick={() => logic.setTodos(logic.todos.filter(el => el.id !== todo.id))}
                  >
                    {xMark}
                  </Button_Delete>
                </Div_ListItemContainer>
              ))}
            </div>
          </form>
          <Div_TodoFooter>
            <P_CountItems>
              {logic.todos.filter(todo => !todo.completed).length} items left
            </P_CountItems>
            <Button_DeleteCompleted onClick={logic.deleteCompletedHandler}>
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
  height: 100vh;
  background-color: ${themes.color.bright};
`

const Div_TodoContainer = styled.div`
  margin: 0 auto;
  padding: ${themes.spacing.xs} 0;

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

  padding: ${themes.spacing.xs};

  border-left: 1px solid ${themes.color.dark};
  border-right: 1px solid ${themes.color.dark};
  border-bottom: 1px solid ${themes.color.dark};

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

  padding: ${themes.spacing.s};
  padding-left: ${themes.spacing.l};

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

  padding-left: ${themes.spacing.m};
  padding-right: ${themes.spacing.s};

  word-break: break-all;

  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  color: ${props => (props.completed ? `${themes.color.darkgrey}` : `${themes.color.dark}`)};
  background-color: ${themes.color.bright};
`

const P_CountItems = styled.p`
  margin: 0 ${themes.spacing.xs};
  padding-top: 0.3em;
  padding-bottom: 0.3em;

  border-bottom: 2px solid ${themes.color.dark};
  border-top: 2px solid ${themes.color.dark};

  font-weight: 700;

  color: ${themes.color.dark};

  @media (max-width: 560px) {
    display: none;
  }
`

const Button_Submit = styled.button`
  display: none;
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
const Button_Filters = styled.button`
  margin: ${themes.spacing.xs};
  padding: ${themes.spacing.xs};

  transition: color 0.5s, background-color 0.5s;

  border: 1px solid transparent;
  border-radius: 5%;

  width: 7em;

  font-weight: 700;

  background-color: ${themes.color.dark};
  color: ${themes.color.bright};
  &:focus,
  :hover {
    transition: ease-out;
    color: ${themes.color.dark};
    border: 1px solid ${themes.color.dark};
    background-color: ${themes.color.bright};
  }
`
