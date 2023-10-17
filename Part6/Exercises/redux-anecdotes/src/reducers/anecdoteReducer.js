import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotesService"

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
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const {createAnecdote, voteAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer