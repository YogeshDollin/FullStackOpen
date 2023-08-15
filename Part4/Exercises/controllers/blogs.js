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

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
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
    }else{
        response.status(401).json({error: "token invalid"})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const updateBlog = request.body

    const result = await Blog.findByIdAndUpdate(request.params.id, {likes: updateBlog.likes}, {new: true, runValidators: true})
    response.status(200).json(result)
})

module.exports = blogsRouter