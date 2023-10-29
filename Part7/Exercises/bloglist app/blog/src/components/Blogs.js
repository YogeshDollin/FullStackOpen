import { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogsService from '../services/blogs'
import Togglable from './Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, resetNotification } from '../store/notificationReducer'
import { setErrorMessage, resetErrorMessage } from '../store/errorMessageReducer'
import { setBlogs, appendBlog, deleteBlog, updateBlog } from '../store/blogReducer'

const Blogs = ({user, setUser}) => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const notification = useSelector(state => state.notification)
    const errorMessage = useSelector(state => state.errorMessage)
    const toggleRef = useRef()
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
        setUser(null)
    }

    const notifyWith = (message, type='info') => {
        if(type === 'info'){
            dispatch(setNotification(message))
            setTimeout(() => {
                dispatch(resetNotification())
            }, 3000)
        }else{
            dispatch(setErrorMessage(message))
            setTimeout(() => {
                dispatch(resetErrorMessage())
            }, 3000)
        }
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
            {notification ? <p id='notification'>{notification}</p> : ''}
            {errorMessage ? <p id='errorMessage'>{errorMessage}</p> : ''}
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