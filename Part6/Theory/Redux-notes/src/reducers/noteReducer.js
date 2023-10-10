import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    {
      content: 'reducer defines how redux store works',
      important: true,
      id: 1
    },
    {
      content: 'state of store can contain any data',
      important: false,
      id: 2
    }
 ]

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action){
      const content = action.payload
      state.push({
        content: content,
        important: false,
        id: generateId()
      })
    },
    toggleImportanceOf(state, action){
      return state.map(note => {
        const newNote = {...note}
        if(note.id === action.payload.id){
          newNote.important = !newNote.important
        }
        newNote
      })
    }
  }
})

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

export const {createNote, toggleImportanceOf} = noteSlice.actions
export default noteSlice.reducer