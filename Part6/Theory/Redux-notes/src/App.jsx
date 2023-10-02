import NewNote from "./NewNote";
import Notes from "./Notes";
import { toggleImportanceOf } from "./reducers/noteReducer";
import { useDispatch, useSelector } from "react-redux";

// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'state changes are made with actions',
//     important: false,
//     id: 2
//   }
// })

// store.dispatch({
//   type: 'TOGGLE_IMPORTANCE',
//   payload: {
//     id: 2
//   }
// })

function App() {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
    console.log(store.getState())
  }  

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }
  return (
    <>
      <NewNote/>
      <Notes/>
    </>
  )
}

export default App