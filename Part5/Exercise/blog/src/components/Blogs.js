import { useState } from "react"
import Blog from "./Blog"
import BlogForm from "./BlogForm"

const Blogs = ({blogs, user, callbacks}) => {
    const [notification, setNotification] = useState('')

    const handleLogout = () => {
        localStorage.removeItem('loggedBlogappUser')
        callbacks.setUser(null)
    }

    return (
        <div>
            <h2>Blogs</h2>
            {notification ? <p id="notification">{notification}</p> : ''}
            <p>{user} logged in <button onClick={handleLogout}>logout</button></p>

            <BlogForm setNotification={setNotification} blogs={blogs} setBlogs={callbacks.setBlogs}/>
            <br/>
            {blogs.map( blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
    )
}

export default Blogs