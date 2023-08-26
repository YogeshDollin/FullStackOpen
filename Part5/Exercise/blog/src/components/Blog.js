import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, removeBlog}) => {
    const [showContent, setShowContent] = useState(false)
    const [blogState, setBlogState] = useState(blog)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    const handleLikeClick = async (evt) => {
        evt.preventDefault()
        const updateBlog = {
            ...blogState,
            likes: blogState.likes + 1,
            user: blogState.user.id
        }
        const response = await blogService.update(updateBlog.id, updateBlog)
        setBlogState(response)
    }

    const handleDeleteBlog = async (evt) => {
        evt.preventDefault()
        await removeBlog(blogState)
    }

    return (
        <div className="blog">
            {showContent ?
                <div>
                    {blogState.title} <button onClick={toggleShowContent}>hide</button>
                    <br/>
                    <a href={blogState.url}>{blogState.url}</a>
                    <br/>
                    likes {blogState.likes}<button onClick={handleLikeClick}>like</button>
                    <br/>
                    {blogState.author}
                    <br/>
                    <button onClick={handleDeleteBlog}>remove</button>
                </div>
                :
                <div>{blog.title} {blog.author} <button onClick={toggleShowContent}>view</button></div>
            }
        </div>
    )
}

export default Blog