import {createStore} from 'redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)
store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  payload: {
    id: 2
  }
})

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

function App() {

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch({
      type: 'NEW_NOTE',
      payload: {
        content: content,
        important: false,
        id: generateId()
      }
    })
    console.log(store.getState())
  }  

  const toggleImportance = (id) => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      payload: {
        id
      }
    })
  }
  return (
    <>
    <form onSubmit={addNote}>
      <input type='text' name='note'/>
      <button type='submit'>add</button>
    </form>
      <ul>
        {store.getState().map(note => 
          <li key={note.id} onClick={() => {toggleImportance(note.id)}}>
            {note.content} <strong>{note.important? 'important' : ''}</strong>
          </li>)}
      </ul>
    </>
  )
}

export default App
