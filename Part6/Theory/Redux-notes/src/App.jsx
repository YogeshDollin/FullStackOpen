import {createStore} from 'redux'

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.payload)
    case 'TOGGLE_IMPORTANCE':
      return state.map(note => {
        let newNote = note
        if(note.id === action.payload.id){
          newNote.important = !note.important
        }
        return newNote
      })
    default:
      return state
  }
}
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

function App() {
  return (
    <>
      <ul>
        {store.getState().map(note => 
          <li key={note.id}>
            {note.content} <strong>{note.important? 'important' : ''}</strong>
          </li>)}
      </ul>
    </>
  )
}

export default App
