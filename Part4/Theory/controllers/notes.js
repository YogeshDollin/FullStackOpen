const noteRouter = require('express').Router()
const Note = require('../models/note')

noteRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

noteRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

noteRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

noteRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

noteRouter.post('/', async (request, response) => {
  const note = request.body
  const newNote = new Note({
    content: note.content,
    important: note.important || false,
  })
  const savedNote = await newNote.save()
  response.status(201).json(savedNote)
})

module.exports = noteRouter