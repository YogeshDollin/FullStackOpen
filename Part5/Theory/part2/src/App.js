import {useState, useEffect} from 'react'
import Note from './component/Note'
import Notification from './component/Notification'
import noteService from './services/notes'
import Footer from './component/Footer'
import loginServcie from './services/login'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const notesToShow =  showAll ? notes : notes.filter( note => note.important)

  useEffect(() => {
    noteService
      .getAll()
      .then(initalNotes => {
        setNotes(initalNotes)
      })
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedNoteappUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      noteService.setToken(user.token)
      setUser(user)
    }
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServcie.login({username, password})

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type='text' value={username} name='username' onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type='password' value={password} name='password' onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type='submit'>Login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNotes}>
      <input value={newNote} onChange={handleChange}/>
      <button type="Submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      {user === null ? loginForm() : noteForm()}
      {
        user && <div>
          <p>{user.name} logged in</p>
          </div>
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note = {note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
      <Footer/>
    </div>
  )
}

export default App