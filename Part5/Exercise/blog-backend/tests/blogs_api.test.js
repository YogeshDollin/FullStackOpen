const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const userFirst = await helper.getFirstUserInDb()
    const blogObjects = helper.initialBlogs.map(blog => {
        blog.user = userFirst.id
        return new Blog(blog)
    })
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 10000)

describe('api get testing', () => {
    test('Should receive all the blogs', async () => {
        const response = await api
            .get('/api/blogs/')
            .expect(200)
            .expect('Content-type', /application\/json/)
        expect(response.body).toHaveLength(6)
    })

    test('id property should be defined for each blogs', async () => {
        const dbBlogs = await helper.blogsInDb()
        expect(dbBlogs[0].id).toBeDefined()
    })
})

describe('api post testing', () => {
    test('Should add the blog in the database', async () => {
        const token = await helper.getToken()
        const newBlog = {
            title: 'A new Blog',
            author: 'Yogesh',
            url: 'YogeshDollin.blogspot.com',
            likes: 10
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-type', /application\/json/)
    
        const dbBlogs = await helper.blogsInDb()
        expect(dbBlogs).toHaveLength(helper.initialBlogs.length + 1)
        const titles = dbBlogs.map(b => b.title)
        expect(titles).toContain(newBlog.title)
    })

    test('Should return 401 if token is not sent along with request', async () => {
        const newBlog = {
            title: 'A new Blog',
            author: 'Yogesh',
            url: 'YogeshDollin.blogspot.com',
            likes: 10
        }
    
        const resp = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-type', /application\/json/)
    
        expect(resp.body.error).toContain('token invalid')
    })

    test('like property should be zero if no value is sent in request', async () => {
        const token = await helper.getToken()
        const newBlog = {
            title: 'new Blog2',
            author: "Anonymous",
            url: "Anonymous.blogspot.com",
        }

        const resp = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-type', /application\/json/)
    })

    test('response should 400 bad request if title is missing', async () => {
        const token = await helper.getToken()
        const blogWithoutTitle = {
            author: "without title",
            url: "withoutTitle.blogspot.com",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blogWithoutTitle)
            .expect(400)
    })

    test('response should 400 bad request if url is missing', async () => {
        const token = await helper.getToken()
        const blogWithoutTitle = {
            title: "new blog3",
            author: "without title",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blogWithoutTitle)
            .expect(400)
    })
})

describe('api delete testing', ()  => {
    test('delete successfully with code 204 if ID is valid', async () => {
        const token = await helper.getToken()
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test('delete fails with code 401 if token is not present', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)
    })

    test('delete returns 404 if ID does not exist', async () => {
        const token = await helper.getToken()
        const id = await helper.nonExistingId();
        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
    })
})

describe('api put testing', () => {
    test('update likes returns with code 200 ', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const updateBlog = blogsAtStart[0]
        updateBlog.likes += 2
        await api
            .put(`/api/blogs/${updateBlog.id}`)
            .send({likes: updateBlog.likes})
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        updatedBlog = blogsAtEnd.filter(b => b.id === updateBlog.id)[0]
        expect(updateBlog.likes).toBe(updatedBlog.likes)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})