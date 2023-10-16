import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

// console.log(store.getState())

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers form one reducer from many single reducers'))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)
// store.subscribe(renderApp)

