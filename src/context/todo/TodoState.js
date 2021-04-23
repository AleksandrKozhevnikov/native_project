import React, {useReducer, useContext} from 'react'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import {ScreenContext} from '../screen/screenContext'
import {ADD_TODO, 
        REMOVE_TODO, 
        SHOW_ERROR, 
        UPDATE_TODO, 
        FETCH_TODOS, 
        HIDE_LOADER, 
        SHOW_LOADER, 
        CLEAR_ERROR} from '../types'
import {Alert} from 'react-native'
import {Http} from '../../http'


export const TodoState = ({children}) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }

    const {changeScreen} = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)
   
    const addTodo = async title => {
      const data = await Http.post('https://native-project-88bc6.firebaseio.com/todos.json', 
      {title}
      )
      dispatch({type: ADD_TODO, title, id: data.name})
    }
    const removeTodo = id => {
        const todo = state.todos.find(item => item.id === id)
        Alert.alert(
            'Remove item',
            `Are you sure you want delete item '${todo.title}'`,
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              { 
                text: 'OK', 
                style: 'destructive',
                onPress: async () => {
                  changeScreen(null)
                    await Http.delete(`https://native-project-88bc6.firebaseio.com/todos/${id}.json`)
                  dispatch({type: REMOVE_TODO, id})
                }
            }
            ],
            { cancelable: false }
          );
    }
    const fetchTodos = async () => {
      showLoader()
      clearError()
      try {
        const data = await Http.get('https://native-project-88bc6.firebaseio.com/todos.json')
        if (data) {
          const todos = Object.keys(data).map(key => ({...data[key], id: key}))
          dispatch({type: FETCH_TODOS, todos})
        } else {
          const todos = []
          dispatch({type: FETCH_TODOS, todos})
        }
      } catch (e) {
        showError('Something goes wrong, try again later...')
        console.log(e)
      } finally {
        hideLoader()
      }
    }
    const updateTodo = async (id, title) => {
      clearError()
      try {
        await Http.patch(`https://native-project-88bc6.firebaseio.com/todos/${id}.json`,
        {title}
        )
        dispatch({type: UPDATE_TODO, title, id})
      } catch(e) {
        console.log(e)
        showError('Something goes wrong, try again later...')
      }
    }
    const showLoader = () => dispatch({type: SHOW_LOADER})
    const hideLoader = () => dispatch({type: HIDE_LOADER})
    const showError = error => dispatch({type: SHOW_ERROR, error})
    const clearError = () => dispatch({type: CLEAR_ERROR})

    return <TodoContext.Provider value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        fetchTodos,
        addTodo, 
        removeTodo, 
        updateTodo
    }}>{children}</TodoContext.Provider>
    
}