import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import blogsService from '../services/blogs'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const CommentForm = ({blog}) => {
    const [comment, setComment] = useState('')
    const queryClient = useQueryClient()
    const addCommentMutation = useMutation({
        mutationFn: blogsService.addComment,
        onSuccess: (updateBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            const updatedBlogs = blogs.map(blog => blog.id === updateBlog.id ? updateBlog : blog)
            queryClient.setQueryData(['blogs'], updatedBlogs)
        }
    })

    const onSubmitComment = evt => {
        evt.preventDefault()
        addCommentMutation.mutate({id: blog.id, comment})
        setComment('')
    }
    return (
        <>
        <Form onSubmit={onSubmitComment}>
            <Form.Group>
                <InputGroup>
                    <Form.Control type='text' onChange={e => setComment(e.target.value)} value={comment} />
                    <Button variant='success' size='sm' type='submit'>comment</Button>
                </InputGroup>
            </Form.Group>
        </Form>
        </>
    )
}

export default CommentForm