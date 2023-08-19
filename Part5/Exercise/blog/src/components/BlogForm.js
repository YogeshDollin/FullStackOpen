import { useState } from "react"
import blogService from '../services/blogs'

const BlogForm = ({setNotification, blogs, setBlogs}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const createBlog = async (evt) => {
        const blog = {title, author, url}
        try {
            const response = await blogService.create(blog)
            setBlogs(blogs.concat(response))
            setNotification(`a new blog ${response.title} by ${response.author}`)
            setTimeout(() => {
                setNotification('')
            }, 3000);
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (error) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
        }
    }

    return (
        <div>
            <h2>Create new</h2>
            <div>
                title:
                <input type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)} />
            </div>
            <div>
                author:
                <input type="text" name="author" value={author} onChange={({target}) => setAuthor(target.value)} />
            </div>
            <div>
                url:
                <input type="text" name="url" value={url} onChange={({target}) => setUrl(target.value)} />
            </div>
            <button onClick={createBlog}>create</button>
        </div>
    )
}

export default BlogForm