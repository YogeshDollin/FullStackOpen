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

const noteReducer = (state = initialState, action) => {
  console.log(action.type)
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

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content: content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = id => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: {
      id
    }
  }
}

  
export default noteReducer