import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, removeBlog, likeBlog}) => {
    const [showContent, setShowContent] = useState(false)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    const handleLikeClick = async (evt) => {
        evt.preventDefault()
        likeBlog(blog)
    }

    const handleDeleteBlog = async (evt) => {
        evt.preventDefault()
        await removeBlog(blog)
    }

    return (
        <div className="blog">
            {showContent ?
                <div>
                    {blog.title} <button onClick={toggleShowContent}>hide</button>
                    <br/>
                    <a href={blog.url}>{blog.url}</a>
                    <br/>
                    likes {blog.likes}<button onClick={handleLikeClick}>like</button>
                    <br/>
                    {blog.author}
                    <br/>
                    { removeBlog && <button onClick={handleDeleteBlog}>remove</button> }
                </div>
                :
                <div>{blog.title} {blog.author} <button onClick={toggleShowContent}>view</button></div>
            }
        </div>
    )
}

export default Blog