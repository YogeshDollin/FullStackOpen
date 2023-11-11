const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    const user = request.user

    if(!user){
        return response.status(401).json({error: "token invalid"})
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    let savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    savedBlog = await Blog.findById(savedBlog._id).populate('user')
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor , async (request, response) => {
    const blogId = request.params.id

    const blog = await Blog.findById(blogId)
    const user = request.user

    if(blog && user && (blog.user.toString() === user._id.toString())){
        await Blog.findByIdAndRemove(blog.id)
        user.blogs = user.blogs.filter(b => b._id.toString() !== blog.id)
        await user.save()
        response.status(204).end()
    }else if(!blog){
        response.status(404).json({error: "invalid blog id"})
    }
    else{
        response.status(401).json({error: "token invalid"})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const updateBlog = request.body

    let result = await Blog.findByIdAndUpdate(request.params.id, {likes: updateBlog.likes}, {new: true, runValidators: true})

    result = await Blog.findById(result._id).populate('user')
    response.status(200).json(result)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    const blog = await Blog.findById(request.params.id)

    blog.comments = blog.comments.concat(body.comment)
    await blog.save()

    const updateBlog = await Blog.findById(request.params.id)
    response.status(201).json(updateBlog)
})

module.exports = blogsRouter