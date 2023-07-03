import {useState, useEffect} from 'react'
import Note from './component/Note'
import Notification from './component/Notification'
import noteService from './services/notes'
import Footer from './component/Footer'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const notesToShow =  showAll ? notes : notes.filter( note => note.important)

  useEffect(() => {
    noteService
      .getAll()
      .then(initalNotes => {
        setNotes(initalNotes)
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id === id ? returnedNote : n))
      })
      .catch(error => {
        setErrorMessage(`the note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNotes = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    noteService
      .create(noteObject)
      .then(returnedNote =>{
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
  const handleChange = evt =>{
    setNewNote(evt.currentTarget.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note = {note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={addNotes}>
        <input value={newNote} onChange={handleChange}/>
        <button type="Submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App