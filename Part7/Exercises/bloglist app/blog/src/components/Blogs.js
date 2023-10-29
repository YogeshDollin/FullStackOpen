import { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogsService from '../services/blogs'
import Togglable from './Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, resetNotification } from '../store/notificationReducer'
import { setErrorMessage, resetErrorMessage } from '../store/errorMessageReducer'

const Blogs = ({user, setUser}) => {
    const dispatch = useDispatch()
    const [blogs, setBlogs] = useState([])
    const notification = useSelector(state => state.notification)
    const errorMessage = useSelector(state => state.errorMessage)
    const toggleRef = useRef()

    useEffect(() => {
      try {
        blogsService.getAll()
        .then(result => {
            result.sort((blog1, blog2) => blog1.likes < blog2.likes)
          setBlogs(result)
        })
      } catch (error) {
        console.log(error)
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
            dispatch(setNotification(`a new blog ${response.title} by ${response.author}`))
            setTimeout(() => {
                dispatch(resetNotification())
            }, 3000)
            toggleRef.current.toggleVisibility()
        } catch (error) {
            dispatch(setErrorMessage('Failed to create blog'))
            console.log(error)
            setTimeout(() => {
                dispatch(resetErrorMessage())
            }, 3000)
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
            {notification ? <p id='notification'>{notification}</p> : ''}
            {errorMessage ? <p id='errorMessage'>{errorMessage}</p> : ''}
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

            <Togglable buttonLabel='create new note' ref={toggleRef}>
                <BlogForm addBlog={addBlog}/>
            </Togglable>
            <br/>
            {blogs.map( blog => <Blog key={blog.id} blog={blog} removeBlog={user.username === blog.user.username ? removeBlog : null}/>)}
        </div>
    )
}

export default Blogs