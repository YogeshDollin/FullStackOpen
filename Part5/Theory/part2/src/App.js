import { useState, useEffect, useRef } from 'react'
import Note from './component/Note'
import Notification from './component/Notification'
import noteService from './services/notes'
import Footer from './component/Footer'
import loginServcie from './services/login'
import LoginForm from './component/LoginForm'
import Togglable from './component/Togglable'
import NoteForm from './component/NoteForm'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef = useRef()
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
    const changedNote = { ...note, important: !note.important }

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

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServcie.login({ username, password })

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

  const loginForm = () => {
    // (
    //   <Togglable buttonLabel='login'>
    //       <LoginForm username={username} password={password} handleUsernameChange={({ target }) => setUsername(target.value)}
    //         handlePasswordChange = {({ target }) => setPassword(target.value)}  handleSubmit={handleLogin}/>
    //   </Togglable>
    // )
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Togglable>
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