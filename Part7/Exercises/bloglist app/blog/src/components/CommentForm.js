import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import blogsService from '../services/blogs'

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
        <form onSubmit={onSubmitComment}>
            <input type='text' onChange={e => setComment(e.target.value)} value={comment}/>
            <button type='submit'>comment</button>
        </form>
    )
}

export default CommentForm