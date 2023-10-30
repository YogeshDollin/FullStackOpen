import { useContext, useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogsService from '../services/blogs'
import Togglable from './Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { setNotificationAction, resetNotificationAction } from '../store/notificationReducer'
import { setBlogs, appendBlog, deleteBlog, updateBlog } from '../store/blogReducer'
import { resetUser } from '../store/userReducer'
import AppContext from '../context/appContext'
import Notification from './Notification'

const Blogs = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    // const notification = useSelector(state => state.notification)
    // const errorMessage = useSelector(state => state.errorMessage)
    const [notification, notificationDispatch] = useContext(AppContext)
    const toggleRef = useRef()
    const user = useSelector(state => state.user)
    useEffect(() => {
      try {
        blogsService.getAll()
        .then(result => {
            result.sort((blog1, blog2) => blog1.likes < blog2.likes)
          dispatch(setBlogs(result))
        })
      } catch (error) {
        console.log(error)
      }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('loggedBlogappUser')
        dispatch(resetUser())
    }

    const notifyWith = (message, type='info') => {
        notificationDispatch(setNotificationAction({type, message}))
        setTimeout(() => {
            notificationDispatch(resetNotificationAction())
        }, 3000)
    }

    const addBlog = async (blog) => {
        try {
            const response = await blogsService.create(blog)
            dispatch(appendBlog(response))
            notifyWith(`a new blog ${response.title} by ${response.author}`)
            toggleRef.current.toggleVisibility()
        } catch (error) {
            console.log(error)
            notifyWith('Failed to create blog', 'error')
        }
    }

    const removeBlog = async (blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            blogsService.remove(blog.id)
            dispatch(deleteBlog(blog))
        }
    }

    const likeBlog = async (blog) => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }
        const response = await blogsService.update(updatedBlog.id, updatedBlog)
        dispatch(updateBlog(response))
        notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification type={notification.type} message={notification.message}/>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

            <Togglable buttonLabel='create new note' ref={toggleRef}>
                <BlogForm addBlog={addBlog}/>
            </Togglable>
            <br/>
            {blogs.map( blog => <Blog key={blog.id} blog={blog} removeBlog={user.username === blog.user.username ? removeBlog : null} likeBlog={likeBlog}/>)}
        </div>
    )
}

export default Blogs