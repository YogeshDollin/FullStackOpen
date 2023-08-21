import { useState } from "react"

const Blog = ({blog}) => {
    const [showContent, setShowContent] = useState(false)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }
    return (
        <div className="blog">
            {showContent ?
                <div>
                    {blog.title} <button onClick={toggleShowContent}>hide</button>
                    <br/>
                    {blog.url}
                    <br/>
                    likes {blog.likes}<button>like</button>
                    <br/>
                    {blog.author}
                </div>
                :
                <div>{blog.title} {blog.author} <button onClick={toggleShowContent}>view</button></div>
            }
        </div>
    )
}

export default Blog