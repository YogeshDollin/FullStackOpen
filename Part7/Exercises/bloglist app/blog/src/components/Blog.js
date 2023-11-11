
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
        <div className="blog">
            <div>
                <h1>{blog.title} {blog.author}</h1>
                <a href={blog.url}>{blog.url}</a>
                <br/>
                likes {blog.likes}<button onClick={handleLikeClick}>like</button>
                <br/>
                added by{blog.author}
                <br/>
                { removeBlog && <button onClick={handleDeleteBlog}>remove</button> }
            </div>
        </div>
    )
}

// const Blog = () => {
//     return (
//         <div>
//             This is individual blog
//         </div>
//     )
// }

export default Blog