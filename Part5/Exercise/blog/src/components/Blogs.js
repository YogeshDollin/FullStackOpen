import Blog from "./Blog"

const Blogs = ({blogs, user, setUser}) => {

    const handleLogout = () => {
        localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    return (
        <div>
            <h2>Blogs</h2>
            <p>{user} logged in <button onClick={handleLogout}>logout</button></p>
            {blogs.map( blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
    )
}

export default Blogs