import { createSlice } from "@reduxjs/toolkit"

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
    createNote(state, action){
      state.push(action.payload)
    },
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

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

export const {createNote, toggleImportanceOf, appendNote, setNotes} = noteSlice.actions
export default noteSlice.reducer