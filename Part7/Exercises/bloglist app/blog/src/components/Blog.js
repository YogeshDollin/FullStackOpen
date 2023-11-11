import CommentForm from './CommentForm'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const Blog = ({blog, removeBlog, likeBlog}) => {

    const handleLikeClick = async (evt) => {
        evt.preventDefault()
        likeBlog(blog)
    }

    const handleDeleteBlog = async (evt) => {
        evt.preventDefault()
        await removeBlog(blog)
    }

    return (
        <div className='container'>
            <Card bg='light'>
                <Card.Body>
                    <Card.Title>{blog.title} {blog.author}</Card.Title>
                    <Card.Text>
                        <a href={blog.url}>{blog.url}</a>
                        <br/><br/>
                        likes {blog.likes} <Button variant='primary' size='sm' onClick={handleLikeClick}>like</Button>
                        <br/>
                        added by <em>{blog.author}</em>
                    </Card.Text>
                    { removeBlog && <Button variant='primary' onClick={handleDeleteBlog}>remove</Button> }
                    <h3>comments</h3>
                    <CommentForm blog={blog}/>
                    <br/>
                    <ListGroup>
                        {
                            blog.comments && blog.comments.map((comment, index) => <ListGroup.Item action variant='success' key={index}>{comment}</ListGroup.Item>)
                        }
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Blog