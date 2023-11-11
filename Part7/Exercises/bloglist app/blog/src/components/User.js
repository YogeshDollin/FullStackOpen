const User = ({user}) => {
    if(!user) return null

    return(
        <div>
            <h1>{user.name}</h1>
            <br/>
            <strong>added blogs</strong>
            <br/>
            <ul>
                {user.blogs.map(blog => 
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                    )}
            </ul>
        </div>
    )
}

export default User