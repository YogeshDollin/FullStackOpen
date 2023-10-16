import { useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { useEffect } from "react";
import noteService from './services/notes'
import { setNotes } from "./reducers/noteReducer";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService.getAll()
      .then(notes => {
        dispatch(setNotes(notes))
      })
  }, [])
  return (
    <>
      <NewNote/>
      <VisibilityFilter/>
      <Notes/>
    </>
  )
}

export default App