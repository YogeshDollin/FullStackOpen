require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})


const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    important: true
})

// eslint-disable-next-line no-unused-vars
note.save().then( result => {
    console.log('note saved')
    mongoose.connection.close()
})

// const note2 = new Note({
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
// })

// // eslint-disable-next-line no-unused-vars
// note2.save().then( result => {
//     console.log('note saved')
//     mongoose.connection.close()
// })

Note.find({}).then( result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})