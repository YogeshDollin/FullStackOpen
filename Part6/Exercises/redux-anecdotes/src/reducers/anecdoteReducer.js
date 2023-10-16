import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      state.push(action.payload)
    },
    voteAnecdote(state, action){
      state.map(anecdote => anecdote.id === action.payload ? anecdote.votes++ : anecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const {createAnecdote, voteAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer