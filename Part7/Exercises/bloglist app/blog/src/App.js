import { useEffect, useReducer, useState } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/loginForm'
import blogsService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/userReducer'
import notificationReducer from './store/notificationReducer'
import AppContext from './context/appContext'
import Header from './components/Header'
import { Route, Routes, useMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import userService from './services/users'
import Blog from './components/Blog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const [users, setUsers] = useState([])

  const queryClient = useQueryClient()
  const result = useQuery({
      queryKey: ['blogs'],
      queryFn: () => blogsService.getAll().then(res => res.sort((b1, b2) => b1.likes < b2.likes)),
      onError: (err) => {console.log(err)},
      enabled: !!user
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

  useEffect(() => {
    let loggedUser = localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      loggedUser = JSON.parse(loggedUser)
      dispatch(setUser(loggedUser))
      blogsService.setToken(loggedUser.token)
    }
    try {
      userService.getUsers()
          .then(res => {
              setUsers(res)
          })
    } catch (error) {
        console.log(error)
    }
  }, [])


  const match = useMatch('/users/:id')
  const selectedUser = match ? users.find(user => user.id === match.params.id) : null

  const matchBlog = useMatch('/blogs/:id')
  const blogs = queryClient.getQueryData(['blogs'])
  const selectedBlog = matchBlog && blogs ? blogs.find(blog => blog.id === matchBlog.params.id) : null

  if(result.isLoading){
    return <p>loading data...</p>
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
    <AppContext.Provider value={[notification, notificationDispatch]}>
      {user === null ? <LoginForm setUser={setUser}/> : <>
        <Header/>
        <Routes>
          <Route path='/users' element={<Users users={users}/>}/>
          <Route path='/users/:id' element={<User user={selectedUser}/>}/>
          <Route path='/' element={<Blogs/>}/>
          <Route path='/blogs' element={<Blogs />}/>
          <Route path='/blogs/:id' element={<Blog blog={selectedBlog} removeBlog={selectedBlog && user.username === selectedBlog.user.username ? removeBlog : null} likeBlog={likeBlog}/>}/>
        </Routes>
      </>}
    </AppContext.Provider>
  )
}

export default App
