import { useRef, useContext } from 'react'
import BlogForm from './BlogForm'
import blogsService from '../services/blogs'
import Togglable from './Togglable'
import { setNotificationAction, resetNotificationAction } from '../store/notificationReducer'
import AppContext from '../context/appContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Link } from 'react-router-dom'

const Blogs = () => {
    const queryClient = useQueryClient()

    const newBlogMutation = useMutation({
        mutationFn: blogsService.create,
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            const appendedBlogs = []
            blogs.forEach(blog => {
                appendedBlogs.push(blog)  
            })
            appendedBlogs.push(newBlog)
            queryClient.setQueryData(['blogs'], appendedBlogs)
            notifyWith(`a new blog ${newBlog.title} by ${newBlog.author}`)
        },
        onError: (err) => {
            console.log(err)
        }
    })
    
    const toggleRef = useRef()
    const [notification, notificationDispatch] = useContext(AppContext)
    
    const blogs = queryClient.getQueryData(['blogs'])

    const notifyWith = (message, type='info') => {
        notificationDispatch(setNotificationAction({type, message}))
        setTimeout(() => {
            notificationDispatch(resetNotificationAction())
        }, 3000)
    }

    const addBlog = async (blog) => {
        try {
            newBlogMutation.mutate(blog)
            toggleRef.current.toggleVisibility()
        } catch (error) {
            console.log(error)
            notifyWith('Failed to create blog', 'error')
        }
    }

    return (
        <div>
            <Togglable buttonLabel='create new note' ref={toggleRef}>
                <BlogForm addBlog={addBlog}/>
            </Togglable>
            <br/>
            {/* {blogs.map( blog => <Blog key={blog.id} blog={blog} removeBlog={user.username === blog.user.username ? removeBlog : null} likeBlog={likeBlog}/>)} */}
            {blogs.map(blog => <div key={blog.id} className='blog'><Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link></div>)}
        </div>
    )
}

export default Blogs