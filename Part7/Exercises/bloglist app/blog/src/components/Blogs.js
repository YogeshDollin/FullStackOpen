import { useRef, useContext } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogsService from '../services/blogs'
import Togglable from './Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { setNotificationAction, resetNotificationAction } from '../store/notificationReducer'
import AppContext from '../context/appContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const Blogs = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: () => blogsService.getAll().then(res => res.sort((b1, b2) => b1.likes < b2.likes)),
        onError: (err) => {console.log(err)}
    })

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
    const updateBlogMutation = useMutation({
        mutationFn: blogsService.update,
        onSuccess: (updatedBlog) => {
            const fetchedBlogs = queryClient.getQueryData(['blogs'])
            const updatedBlogs = []
            fetchedBlogs.forEach(blog => {
                if(blog.id === updatedBlog.id){
                    updatedBlogs.push(updatedBlog)
                }else{
                    updatedBlogs.push(blog)
                }
            })
            queryClient.setQueryData(['blogs'], updatedBlogs)
        },
        onError: (err) => {
            console.log(err)
        }
    })
    const removeBlogMutation = useMutation({
        mutationFn: blogsService.remove,
        onSuccess: (response, id) => {
            const fetchedBlogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], fetchedBlogs.filter( blog => blog.id !== id) )
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const toggleRef = useRef()
    const user = useSelector(state => state.user)
    const [notification, notificationDispatch] = useContext(AppContext)

    if(result.isLoading){
        return <p>loading data...</p>
    }
    const blogs = result.data

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

    const removeBlog = async (blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            // blogsService.remove(blog.id)
            // dispatch(deleteBlog(blog))
            removeBlogMutation.mutate(blog.id)
        }
    }

    const likeBlog = async (blog) => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }
        updateBlogMutation.mutate(updatedBlog)
    }

    return (
        <div>
            <Togglable buttonLabel='create new note' ref={toggleRef}>
                <BlogForm addBlog={addBlog}/>
            </Togglable>
            <br/>
            {blogs.map( blog => <Blog key={blog.id} blog={blog} removeBlog={user.username === blog.user.username ? removeBlog : null} likeBlog={likeBlog}/>)}
        </div>
    )
}

export default Blogs