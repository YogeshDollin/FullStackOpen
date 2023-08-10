const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const helper = require('./test_helper')

const api = supertest(app)

// const initialNotes = [
//     {
//         content: 'HTML is easy',
//         important: false
//     },
//     {
//         content: 'Browser can execute only Javascript',
//         important: true
//     }
// ]

beforeEach(async () => {
    await Note.deleteMany({})
    console.log('cleared')

    const noteObjects = helper.initialNotes.map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
}, 50000)

describe('when there is initially some notes saved', () => {
    test('notes are returned as json', async () => {
        await api
                .get('/api/notes')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    }, 10000)

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')

        const contents = response.body.map(r => r.content)
        expect(contents).toContain('Browser can execute only Javascript')
    })
})

describe('viewing a specific note', () => {
    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToView = notesAtStart[0]
        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-type', /application\/json/)

        expect(resultNote.body).toEqual(noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonExistingId = await helper.nonExistingId()

        await api
            .get(`/api/notes/${validNonExistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await helper.notesInDb()
        expect(response).toHaveLength(helper.initialNotes.length + 1)
        const contents = response.map(r => r.content)    
        expect(contents).toContain('async/await simplifies making async calls')
    })
    test('fails with status code 400 if data invalid', async () => {
        const newNote = {
            important: true
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
    
        const response = await helper.notesInDb()
        expect(response).toHaveLength(helper.initialNotes.length)
    })
})

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const notesAtStart = await helper.notesInDb()
        const notesToDelete = notesAtStart[0]

        await api
            .delete(`/api/notes/${notesToDelete.id}`)
            .expect(204)

        const notesAtEnd = await helper.notesInDb()
        
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
        
        const contents = notesAtEnd.map(r => r.content)

        expect(contents).not.toContain(notesToDelete.content)
    })
})
afterAll(async() => {
    await mongoose.connection.close()
})