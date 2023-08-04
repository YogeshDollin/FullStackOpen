const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, val) => {
        return sum + val.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let mostLiked = {likes: 0}
    let favoriteBlogs = []
    blogs.forEach(blog => {
        if(mostLiked.likes < blog.likes){
            mostLiked = blog
        }
        else if(mostLiked.likes === blog.likes){
            favoriteBlogs.push(mostLiked)
            mostLiked = blog
        }
    });
    favoriteBlogs.push(mostLiked)
    return !mostLiked.title ? {} : {
        title: favoriteBlogs[0].title,
        author: favoriteBlogs[0].author,
        likes: favoriteBlogs[0].likes
    }
}

const authorBlogsDictionary = (blogs) => {
    const dictionary = {}
    blogs.forEach(blog => {
        const author = blog.author
        if(dictionary[author]){
            dictionary[author].push(blog)
        }else{
            dictionary[author] = [blog]
        }
    });
    return dictionary
}

const mostBlogs = (blogs) => {
    let mostBlogs = {blogs: 0}
    const authorsWithMostBlogs = []

    const dict = authorBlogsDictionary(blogs)

    for(author in dict){
        const blogCount = dict[author].length
        if(mostBlogs.blogs < blogCount){
            mostBlogs = {author: author, blogs: blogCount}
        }
        else if (mostBlogs.blogs === blogCount){
            authorsWithMostBlogs.push(mostBlogs)
            mostBlogs = {author: author, blogs: blogCount}
        }
    }
    authorsWithMostBlogs.push(mostBlogs)
    return !mostBlogs.hasOwnProperty('author') ? {} : authorsWithMostBlogs[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}