const noteReducer = (state = [], action) => {
    switch (action.type) {
      case 'NEW_NOTE':
        return [...state, action.payload]
      case 'TOGGLE_IMPORTANCE':
        return state.map(note => {
          const newNote = {...note}
          if(note.id === action.payload.id){
            newNote.important = !note.important
          }
          return newNote
        })
      default:
        return state
    }
  }

export default noteReducer