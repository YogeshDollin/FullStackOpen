const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

describe('when there is initally one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const password = await bcrypt.hash('superuser', 10)
        const user = new User({ username: 'root', password: password })

        await user.save()
    }, 10000)

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'jamesbond',
            name: 'James Bond',
            password: 'agent'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails when username is not unique', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "root",
            name: "Taylor swift",
            password: 'blankSpace'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails when username is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "ta",
            name: "Taylor swift",
            password: 'blankSpace'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-type', /application\/json/)

        expect(result.body.error).toContain('Path `username` (`ta`) is shorter than the minimum allowed length')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails when password is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "ta",
            name: "Taylor swift",
            password: 'bl'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-type', /application\/json/)

        expect(result.body.error).toContain('password is required and should be at least 3 characters long')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    afterAll(async () => {
        mongoose.connection.close()
    })
})