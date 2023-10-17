import { useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { useEffect } from "react";
import { initializeNotes } from "./reducers/noteReducer";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
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