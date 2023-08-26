import { useEffect, useRef, useState } from "react"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import blogsService from '../services/blogs'
import Togglable from "./Togglable"

const Blogs = ({user, setUser}) => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const toggleRef = useRef()

    useEffect(() => {
      try {
        blogsService.getAll()
        .then(result => {
            result.sort((blog1, blog2) => blog1.likes < blog2.likes)
          setBlogs(result)
        })
      } catch (error) {
      }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const addBlog = async (blog) => {
        try {
            const response = await blogsService.create(blog)
            setBlogs(blogs.concat(response))
            setNotification(`a new blog ${response.title} by ${response.author}`)
            setTimeout(() => {
                setNotification('')
            }, 3000)
            toggleRef.current.toggleVisibility()
        } catch (error) {
            setErrorMessage('Failed to create blog')
            console.log(error)
            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
        }
    }

    const removeBlog = async (blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            blogsService.remove(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        }
    }

    return (
        <div>
            <h2>Blogs</h2>
            {notification ? <p id="notification">{notification}</p> : ''}
            {errorMessage ? <p id="errorMessage">{errorMessage}</p> : ''}
            <p>{user} logged in <button onClick={handleLogout}>logout</button></p>

            <Togglable buttonLabel='create new note' ref={toggleRef}>
                <BlogForm addBlog={addBlog}/>
            </Togglable>
            
            <br/>
            {blogs.map( blog => <Blog key={blog.id} blog={blog} removeBlog={removeBlog}/>)}
        </div>
    )
}

export default Blogs