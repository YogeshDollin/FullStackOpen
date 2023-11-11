import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const BlogForm = ({addBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = async (evt) => {
        evt.preventDefault()
        const blog = {title, author, url}
        addBlog(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new</h2>
            <Form onSubmit={createBlog}>
                <Form.Group >
                    <Form.Label >Title: </Form.Label>
                    <Form.Control type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author: </Form.Label>
                    <Form.Control type="text" name="author" value={author} onChange={({target}) => setAuthor(target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Url: </Form.Label>
                    <Form.Control type="text" name="url" value={url} onChange={({target}) => setUrl(target.value)} />
                </Form.Group>
                <Button className='mt-3 mb-3' variant='success' type="submit">create</Button>
            </Form>
        </div>
    )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
}

export default BlogForm