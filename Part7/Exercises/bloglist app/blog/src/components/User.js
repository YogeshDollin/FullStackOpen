import ListGroup from 'react-bootstrap/ListGroup'
const User = ({user}) => {
    if(!user) return null

    return(
        <div className='container'>
            <h1>{user.name}</h1>
            <br/>
            <strong>added blogs</strong>
            <br/>
            <ul>
                
            </ul>
            <ListGroup>
                {user.blogs.map(blog => 
                    <ListGroup.Item variant='info' key={blog.id}>
                        {blog.title}
                    </ListGroup.Item>
                    )}
            </ListGroup>
        </div>
    )
}

export default User