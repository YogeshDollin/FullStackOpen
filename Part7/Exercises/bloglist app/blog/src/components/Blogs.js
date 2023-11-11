import { useRef, useContext } from 'react'
import BlogForm from './BlogForm'
import blogsService from '../services/blogs'
import Togglable from './Togglable'
import { setNotificationAction, resetNotificationAction } from '../store/notificationReducer'
import AppContext from '../context/appContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

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
            notifyWith(err.message, 'danger')
        }
    })
    
    const toggleRef = useRef()
    const [notification, notificationDispatch] = useContext(AppContext)
    
    const blogs = queryClient.getQueryData(['blogs'])

    const notifyWith = (message, type='success') => {
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
        <div className='container'>
            <h1>Blogs</h1>
            <Togglable buttonLabel='create new note' ref={toggleRef}>
                <BlogForm addBlog={addBlog}/>
            </Togglable>
            <br/>
            <ListGroup>
                {blogs.map(blog => <ListGroup.Item action variant='warning' key={blog.id}><Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link></ListGroup.Item>)}
            </ListGroup>
        </div>
    )
}

export default Blogs