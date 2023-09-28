import { useEffect, useState } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/loginForm'
import blogService from './services/blogs'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let loggedUser = localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      loggedUser = JSON.parse(loggedUser)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])
  return (
    user === null ? <LoginForm setUser={setUser}/> : <Blogs user={user} setUser={setUser}/>
  )
}

export default App
