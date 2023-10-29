import { useEffect, useState } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/loginForm'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/userReducer'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    let loggedUser = localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      loggedUser = JSON.parse(loggedUser)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])
  return (
    user === null ? <LoginForm setUser={setUser}/> : <Blogs/>
  )
}

export default App
