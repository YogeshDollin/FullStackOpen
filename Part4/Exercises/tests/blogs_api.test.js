const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 10000)

describe('api testing', () => {
    test('Should receive all the blogs', async () => {
        const response = await api
            .get('/api/blogs/')
            .expect(200)
            .expect('Content-type', /application\/json/)
        expect(response.body).toHaveLength(6)
    })

    test('Should add the blog in the database', async () => {
        const newBlog = {
            title: 'A new Blog',
            author: 'Yogesh',
            url: 'YogeshDollin.blogspot.com',
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-type', /application\/json/)

        const dbBlogs = await helper.blogsInDb()
        expect(dbBlogs).toHaveLength(helper.initialBlogs.length + 1)
        const titles = dbBlogs.map(b => b.title)
        expect(titles).toContain(newBlog.title)
    })

    test('id property should be defined for each blogs', async () => {
        const dbBlogs = await helper.blogsInDb()
        expect(dbBlogs[0].id).toBeDefined()
    })

    test('like property should be zero if no value is sent in request', async () => {
        const newBlog = {
            title: 'new Blog2',
            author: "Anonymous",
            url: "Anonymous.blogspot.com",
        }

        const resp = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-type', /application\/json/)
        console.log(resp.body)
    })

    test('response should 400 bad request if title is missing', async () => {
        const blogWithoutTitle = {
            author: "without title",
            url: "withoutTitle.blogspot.com",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400)
    })

    test('response should 400 bad request if url is missing', async () => {
        const blogWithoutTitle = {
            title: "new blog3",
            author: "without title",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})