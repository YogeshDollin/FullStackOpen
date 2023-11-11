import { useEffect, useReducer, useState } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/loginForm'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/userReducer'
import notificationReducer from './store/notificationReducer'
import AppContext from './context/appContext'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  useEffect(() => {
    let loggedUser = localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      loggedUser = JSON.parse(loggedUser)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])
  return (
    <AppContext.Provider value={[notification, notificationDispatch]}>
      {user === null ? <LoginForm setUser={setUser}/> : <>
        <Header/>
        <QueryClientProvider client={new QueryClient()}>
          <Routes>
            <Route path='/users' element={<Users/>}/>
            <Route path='/' element={<Blogs/>}/>
          </Routes>
        </QueryClientProvider>
      </>}
    </AppContext.Provider>
  )
}

export default App
