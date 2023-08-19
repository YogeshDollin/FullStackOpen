import { useEffect, useState } from "react"
import blogsService from './services/blogs'
import Blogs from './components/Blogs'
import LoginForm from "./components/loginForm"
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    let loggedUser = localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      loggedUser = JSON.parse(loggedUser)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)

      try {
        blogsService.getAll()
        .then(result => {
          setBlogs(result)
        })
      } catch (error) {
      }
    }
  }, [])
  return (
    user === null ? <LoginForm setUser={setUser}/> : <Blogs blogs={blogs} user={user.name} callbacks={{setUser, setBlogs}}/>
  )
}

export default App;
