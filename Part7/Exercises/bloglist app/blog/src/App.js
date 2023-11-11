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
import { Route, Routes, useMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import userService from './services/users'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const [users, setUsers] = useState([])

  useEffect(() => {
    let loggedUser = localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      loggedUser = JSON.parse(loggedUser)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
    try {
      userService.getUsers()
          .then(res => {
              setUsers(res)
          })
    } catch (error) {
        console.log(error)
    }
  }, [])

  const match = useMatch('/users/:id')
  const selectedUser = match ? users.find(user => user.id === match.params.id) : null

  return (
    <AppContext.Provider value={[notification, notificationDispatch]}>
      {user === null ? <LoginForm setUser={setUser}/> : <>
        <Header/>
        <QueryClientProvider client={new QueryClient()}>
          <Routes>
            <Route path='/users' element={<Users users={users}/>}/>
            <Route path='/users/:id' element={<User user={selectedUser}/>}/>
            <Route path='/' element={<Blogs/>}/>
          </Routes>
        </QueryClientProvider>
      </>}
    </AppContext.Provider>
  )
}

export default App
