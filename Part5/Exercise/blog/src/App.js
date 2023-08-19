import { useEffect, useState } from "react"
import blogsService from './services/blogs'
import Blogs from './components/Blogs'
import LoginForm from "./components/loginForm"

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogsService.getAll()
      .then(result => {
        setBlogs(result)
      })
  }, [])
  return (
    user === null ? <LoginForm setUser={setUser}/> : <Blogs blogs={blogs} user={user.name} setUser={setUser}/>
  )
}

export default App;
