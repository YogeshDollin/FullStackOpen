const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')

const app = express();
const password = process.argv[2]
const url = `mongodb+srv://mainUser:${password}@cluster0.spqnyh8.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method);
  console.log('Path: ', request.path );
  console.log('---');
  next()
}

app.use(requestLogger)

// let notes = [
//   { id: 1, content: "HTML is easy", important: true },
//   { id: 2, content: "Browser can execute only JavaScript", important: false },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then(notes =>{
    response.json(notes);
  })
});

// app.get("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const note = notes.find((note) => note.id === id);
//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).send('No note available with specified id');
//   }
// });

// app.delete('/api/notes/:id', (request, response) =>{
//   const id = Number(request.params.id)
//   notes = notes.filter( note => note.id !== id)
//   response.status(204).end()
// })

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
//   return maxId + 1
// }

// app.post('/api/notes', (request, response) => {
//   const note = request.body

//   if(!note.content){
//     return response.status(400).json({
//       error: "content missing"
//     })
//   }
//   const newNote = {
//     content: note.content,
//     important: note.important || false,
//     id: generateId()
//   }
//   notes = notes.concat(newNote)
//   response.json(newNote)
// })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
