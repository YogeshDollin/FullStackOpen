import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes' 

// const initialState = [
//     {
//       content: 'reducer defines how redux store works',
//       important: true,
//       id: 1
//     },
//     {
//       content: 'state of store can contain any data',
//       important: false,
//       id: 2
//     }
//  ]

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action){
      console.log(JSON.parse(JSON.stringify(state)))
      return state.map(note => {
        const newNote = {...note}
        if(note.id === action.payload){
          newNote.important = !newNote.important
        }
        return newNote
      })
    },
    appendNote(state, action){
      state.push(action.payload)
    },
    setNotes(state, action){
      return action.payload
    }
  }
})

export const {toggleImportanceOf, appendNote, setNotes} = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}
export const createNote = (content) => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}
export default noteSlice.reducer