import Blog from "./Blog"
import BlogForm from "./BlogForm"

const Blogs = ({blogs, user, setUser}) => {

    const handleLogout = () => {
        localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    return (
        <div>
            <h2>Blogs</h2>

            <p>{user} logged in <button onClick={handleLogout}>logout</button></p>

            <BlogForm/>

            {blogs.map( blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
    )
}

export default Blogs